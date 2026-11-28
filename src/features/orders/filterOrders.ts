import type { Order, OrderState } from './orderTypes';

export type OrderStatusFilter = OrderState | 'all';
export type OrderSort = 'newest' | 'oldest';

export function filterOrders(
  orders: readonly Order[],
  search: string,
  status: OrderStatusFilter,
  sort: OrderSort = 'newest',
): Order[] {
  const term = search.trim().toLowerCase();
  return orders.filter(order =>
    (status === 'all' || order.state === status) &&
    (!term || order.id.toLowerCase().includes(term) || String(order.number).includes(term)),
  ).sort((a, b) => {
    const difference = Date.parse(a.date) - Date.parse(b.date);
    return (sort === 'newest' ? -difference : difference) || a.id.localeCompare(b.id);
  });
}

