import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addItem, clearCart, removeItem, setQuantity, selectCartItems, selectCartQuantity, selectCartTotalCents, selectCartByPharmacy } from './cartSlice';
import type { ListingDetail } from '@/features/catalog/catalogApi';

export function priceToCents(price: string | null): number | null {
  if (price === null || !/^\d+(\.\d{1,2})?$/.test(price)) return null;
  const [whole, fraction = ''] = price.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents <= Math.floor(Number.MAX_SAFE_INTEGER / (100 * 999)) ? cents : null;
}

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const quantity = useAppSelector(selectCartQuantity);
  const totalCents = useAppSelector(selectCartTotalCents);
  const groups = useAppSelector(selectCartByPharmacy);
  const ownerId = useAppSelector(state => state.cart.ownerId);

  function addListing(listing: ListingDetail, amount = 1): boolean {
    const unitPriceCents = priceToCents(listing.price);
    const existing = items.find(item => item.listingId === listing.listingId);
    if (!ownerId || !listing.available || unitPriceCents === null ||
        !listing.listingId || !listing.product.id || !listing.pharmacy.id ||
        !Number.isSafeInteger(amount) || amount < 1 || amount + (existing?.quantity ?? 0) > 999 ||
        (!existing && items.length >= 100)) return false;
    dispatch(addItem({
      listingId: listing.listingId, productId: listing.product.id,
      pharmacyId: listing.pharmacy.id, pharmacyName: listing.pharmacy.name,
      name: listing.product.name, image: listing.product.image,
      unitPriceCents, quantity: amount,
    }));
    return true;
  }

  return {
    items, quantity, totalCents, groups, addListing,
    changeQuantity: (listingId: string, quantity: number) => dispatch(setQuantity({ listingId, quantity })),
    remove: (listingId: string) => dispatch(removeItem(listingId)),
    clear: () => dispatch(clearCart()),
  };
}
