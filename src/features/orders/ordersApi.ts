import { baseApi } from '@/services/baseApi';
import type { CheckoutRequest, Order } from './orderTypes';

// No order requests may reach the server until ownership checks and
// transactional checkout are implemented and verified in the backend.
const unavailable = () => ({
  error: { status: 'CUSTOM_ERROR' as const, error: 'Order operations are not available yet.' },
});

export const ordersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyOrders: builder.query<Order[], void>({
      queryFn: unavailable,
    }),
    getMyOrder: builder.query<Order, string>({
      queryFn: unavailable,
    }),
    checkout: builder.mutation<Order[], CheckoutRequest[]>({
      queryFn: unavailable,
    }),
  }),
});

export const { useGetMyOrdersQuery, useGetMyOrderQuery, useCheckoutMutation } = ordersApi;
