import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@/app/hooks';
import { useGetMyOrdersQuery, useGetMyOrderQuery } from './ordersApi';
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

export function useMyOrders() {
  const authenticated = useAppSelector(state => Boolean(state.auth.session));
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatusFilter>('all');
  const [sort, setSort] = useState<OrderSort>('newest');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const list = useGetMyOrdersQuery(undefined, { skip: !authenticated });
  const detail = useGetMyOrderQuery(authenticated && selectedId ? selectedId : skipToken);

  return {
    search, setSearch, status, setStatus, sort, setSort,
    orders: filterOrders(list.currentData ?? [], search, status, sort),
    selectedId,
    openDetail: (id: string) => setSelectedId(id),
    closeDetail: () => setSelectedId(null),
    selectedOrder: detail.currentData,
    isLoading: list.isLoading,
    isFetching: list.isFetching,
    isError: list.isError,
    error: list.error,
    isDetailLoading: detail.isLoading || detail.isFetching,
    detailError: detail.error,
    resetFilters: () => { setSearch(''); setStatus('all'); setSort('newest'); },
    canCancel: false,
    canDownloadInvoice: false,
  };
}
