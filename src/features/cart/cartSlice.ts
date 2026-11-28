import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import { clearSession, setSession } from '@/features/auth/authSlice';

export interface CartItem {
  listingId: string; productId: string; pharmacyId: string;
  name: string; pharmacyName: string; image?: string | null;
  unitPriceCents: number; quantity: number;
}
interface CartState { ownerId: string | null; items: CartItem[] }
const initialState: CartState = { ownerId: null, items: [] };
const validQuantity = (n: number) => Number.isSafeInteger(n) && n > 0 && n <= 999;
const slice = createSlice({
  name: 'cart', initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      if (!state.ownerId || !validQuantity(payload.quantity) ||
          !Number.isSafeInteger(payload.unitPriceCents) || payload.unitPriceCents < 0 ||
          payload.unitPriceCents > Math.floor(Number.MAX_SAFE_INTEGER / (100 * 999)) || !payload.listingId || !payload.productId || !payload.pharmacyId) return;
      const existing = state.items.find(item => item.listingId === payload.listingId);
      if (existing) {
        const quantity = existing.quantity + payload.quantity;
        if (validQuantity(quantity)) Object.assign(existing, payload, { quantity });
      } else if (state.items.length < 100) state.items.push(payload);
    },
    setQuantity: (state, { payload }: PayloadAction<{ listingId: string; quantity: number }>) => {
      const item = state.items.find(i => i.listingId === payload.listingId);
      if (item && validQuantity(payload.quantity)) item.quantity = payload.quantity;
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.listingId !== payload);
    },
    clearCart: state => { state.items = []; },
  },
  extraReducers: builder => builder
    .addCase(clearSession, () => initialState)
    .addCase(setSession, (state, { payload }) => {
      if (state.ownerId !== payload.user.id) {
        state.items = [];
        state.ownerId = payload.user.id;
      }
    }),
});
export const { addItem, setQuantity, removeItem, clearCart } = slice.actions;
export default slice.reducer;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartQuantity = createSelector([selectCartItems], items => items.reduce((sum, item) => sum + item.quantity, 0));
export const selectCartTotalCents = createSelector([selectCartItems], items => items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0));
export const selectCartByPharmacy = createSelector([selectCartItems], items => {
  const groups = new Map<string, CartItem[]>();
  for (const item of items) {
    const group = groups.get(item.pharmacyId) ?? [];
    group.push(item);
    groups.set(item.pharmacyId, group);
  }
  return Array.from(groups, ([pharmacyId, items]) => ({
    pharmacyId, items, totalCents: items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0),
  }));
});
