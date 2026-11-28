import { createSelector } from '@reduxjs/toolkit';
import { selectCartByPharmacy, selectCartItems } from './cartSlice';
import type { CheckoutRequest } from '@/features/orders/orderTypes';

export const selectCheckoutRequests = createSelector([selectCartByPharmacy], (groups): CheckoutRequest[] =>
  groups.map(({ pharmacyId, items }) => ({
    pharmacyId,
    items: items.map(({ listingId, quantity }) => ({ listingId, quantity })),
  })),
);

export const selectCheckoutPreview = createSelector([selectCartItems, selectCartByPharmacy], (items, groups) => ({
  empty: items.length === 0,
  pharmacyCount: groups.length,
  quantity: items.reduce((sum, item) => sum + item.quantity, 0),
  estimatedTotalCents: groups.reduce((sum, group) => sum + group.totalCents, 0),
  groups,
  // Deliberately disabled until an authorized, transactional checkout API exists.
  canSubmit: false,
}));
