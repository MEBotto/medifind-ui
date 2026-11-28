export type OrderState = 'pending' | 'preparing' | 'cancelled' | 'ready' | 'delivered';

export interface Order {
  id: string;
  number: number;
  date: string;
  totalPrice: string | number | null;
  state: OrderState;
  voidedAt: string | null;
  voidReason: string | null;
}

export interface OrderItem {
  id: string;
  amount: number | null;
  price: string | number | null;
}

// Proposed checkout contract, not yet supported by the backend.
// Prices, ownership and stock must be resolved server-side.
export interface CheckoutRequest {
  pharmacyId: string;
  items: { listingId: string; quantity: number }[];
}
