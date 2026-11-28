import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      return nextResolve(new URL('../src/' + specifier.slice(2) + '.ts', import.meta.url).href, context);
    }
    if (context.parentURL?.endsWith('.ts') && specifier.startsWith('./') && !specifier.endsWith('.ts')) {
      return nextResolve(specifier + '.ts', context);
    }
    return nextResolve(specifier, context);
  },
});

const { default: reducer, addItem, setQuantity, removeItem, selectCartTotalCents } = await import('../src/features/cart/cartSlice.ts');
const { setSession, clearSession } = await import('../src/features/auth/authSlice.ts');
const { selectCheckoutRequests, selectCheckoutPreview } = await import('../src/features/cart/checkoutSelectors.ts');
const { priceToCents } = await import('../src/features/cart/priceToCents.ts');
const { filterOrders } = await import('../src/features/orders/filterOrders.ts');

const session = id => setSession({ user: { id, username: id, email: id + '@example.com', role: null }, token: 'test' });
const item = { listingId: 'l1', productId: 'p1', pharmacyId: 'f1', name: 'Product', pharmacyName: 'Pharmacy', unitPriceCents: 101, quantity: 2 };
const initial = () => reducer(undefined, session('u1'));

test('cart rejects anonymous additions and invalid quantities or prices', () => {
  assert.equal(reducer(undefined, addItem(item)).items.length, 0);
  for (const invalid of [{ quantity: 0 }, { quantity: 1.5 }, { quantity: 1000 }, { unitPriceCents: -1 }, { unitPriceCents: Number.MAX_SAFE_INTEGER }]) {
    assert.equal(reducer(initial(), addItem({ ...item, ...invalid })).items.length, 0);
  }
});

test('cart merges listings, changes quantities and removes items', () => {
  let cart = reducer(initial(), addItem(item));
  cart = reducer(cart, addItem(item));
  assert.equal(cart.items[0].quantity, 4);
  cart = reducer(cart, setQuantity({ listingId: 'l1', quantity: 3 }));
  assert.equal(selectCartTotalCents({ cart }), 303);
  cart = reducer(cart, removeItem('l1'));
  assert.equal(cart.items.length, 0);
});

test('cart preserves same-user session and clears on account change or logout', () => {
  const cart = reducer(initial(), addItem(item));
  assert.equal(reducer(cart, session('u1')).items.length, 1);
  assert.equal(reducer(cart, session('u2')).items.length, 0);
  assert.equal(reducer(cart, clearSession()).ownerId, null);
  assert.equal(reducer(cart, clearSession()).items.length, 0);
});

test('checkout groups pharmacies and excludes client prices from requests', () => {
  let cart = reducer(initial(), addItem(item));
  cart = reducer(cart, addItem({ ...item, listingId: 'l2', pharmacyId: 'f2', quantity: 1 }));
  assert.deepEqual(selectCheckoutRequests({ cart }), [
    { pharmacyId: 'f1', items: [{ listingId: 'l1', quantity: 2 }] },
    { pharmacyId: 'f2', items: [{ listingId: 'l2', quantity: 1 }] },
  ]);
  const preview = selectCheckoutPreview({ cart });
  assert.equal(preview.estimatedTotalCents, 303);
  assert.equal(preview.pharmacyCount, 2);
  assert.equal(preview.canSubmit, false);
  assert.equal(selectCheckoutPreview({ cart: initial() }).empty, true);
});

test('decimal prices convert exactly and invalid inputs are rejected', () => {
  assert.equal(priceToCents('0.29'), 29);
  assert.equal(priceToCents('12.3'), 1230);
  assert.equal(priceToCents('0'), 0);
  for (const value of [null, '-1', '1.234', '1e3', '', '999999999999999999']) {
    assert.equal(priceToCents(value), null);
  }
});

test('order filters search, filter and sort without mutating input', () => {
  const orders = [
    { id: 'ABC', number: 10, date: '2026-01-01', state: 'pending' },
    { id: 'DEF', number: 20, date: '2026-01-02', state: 'ready' },
  ];
  assert.deepEqual(filterOrders(orders, '', 'all').map(o => o.id), ['DEF', 'ABC']);
  assert.deepEqual(filterOrders(orders, '', 'all', 'oldest').map(o => o.id), ['ABC', 'DEF']);
  assert.deepEqual(filterOrders(orders, ' abc ', 'pending'), [orders[0]]);
  assert.deepEqual(filterOrders(orders, '20', 'ready'), [orders[1]]);
  assert.deepEqual(filterOrders(orders, '', 'cancelled'), []);
  assert.equal(orders[0].id, 'ABC');
});
