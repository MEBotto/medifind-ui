import { baseApi } from '@/services/baseApi';
import type { CatalogProduct, NamedReference } from '@/features/catalog/catalogApi';

export interface InventoryListing {
  id: string;
  product: CatalogProduct;
  pharmacy?: NamedReference;
  price: string | null;
  quantity: number;
  active: boolean;
  updatedAt: string;
}
export interface InventoryUpdate { price?: string | null; quantity?: number; active?: boolean }
export interface InventoryCreate extends InventoryUpdate { productId: string; pharmacyId?: string }

export const inventoryApi = baseApi.enhanceEndpoints({ addTagTypes: ['Inventory', 'Catalog'] }).injectEndpoints({
  endpoints: builder => ({
    getInventoryCatalog: builder.query<CatalogProduct[], string | void>({
      query: search => ({ url: '/pharmacy-inventory/catalog', params: search ? { search } : undefined }),
      providesTags: ['Catalog'],
    }),
    getInventory: builder.query<InventoryListing[], string | void>({
      query: pharmacyId => ({ url: '/pharmacy-inventory', params: pharmacyId ? { pharmacyId } : undefined }),
      providesTags: ['Inventory'],
    }),
    addInventory: builder.mutation<InventoryListing, InventoryCreate>({
      query: body => ({ url: '/pharmacy-inventory', method: 'POST', body }),
      invalidatesTags: ['Inventory', 'Catalog'],
    }),
    updateInventory: builder.mutation<InventoryListing, { id: string; body: InventoryUpdate }>({
      query: ({ id, body }) => ({ url: '/pharmacy-inventory/' + encodeURIComponent(id), method: 'PATCH', body }),
      invalidatesTags: ['Inventory', 'Catalog'],
    }),
    deactivateInventory: builder.mutation<InventoryListing, string>({
      query: id => ({ url: '/pharmacy-inventory/' + encodeURIComponent(id), method: 'DELETE' }),
      invalidatesTags: ['Inventory', 'Catalog'],
    }),
  }),
});
export const { useGetInventoryCatalogQuery, useLazyGetInventoryCatalogQuery, useGetInventoryQuery, useLazyGetInventoryQuery, useAddInventoryMutation, useUpdateInventoryMutation, useDeactivateInventoryMutation } = inventoryApi;
