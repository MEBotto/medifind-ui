import { baseApi } from '@/services/baseApi';

export interface NamedReference { id: string; name: string }
export interface CatalogProduct {
  id: string;
  name: string;
  description: string | null;
  barcode: string | null;
  image?: string | null;
  presentation: string | null;
  dose: number | null;
  unit: string | null;
  laboratory?: NamedReference | null;
  category?: NamedReference | null;
}
export interface Pagination { page: number; limit: number; total: number; pages: number }
export interface CatalogSearch { q: string; page?: number; limit?: number }
export interface PharmacySearch {
  productId: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
  orderBy?: 'distance' | 'price' | 'name';
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}
export interface ProductAvailability {
  listingId: string;
  pharmacy: { id: string; name: string; address: string | null; lat: number | null; lng: number | null; phone: string | null };
  price: string | null;
  available: boolean;
  updatedAt: string;
  distanceKm: number | null;
}
export interface ListingDetail extends Omit<ProductAvailability, 'distanceKm' | 'pharmacy'> {
  product: CatalogProduct;
  pharmacy: ProductAvailability['pharmacy'] & { weeklyHours: unknown[] };
}
export const catalogApi = baseApi.enhanceEndpoints({ addTagTypes: ['Catalog'] }).injectEndpoints({
  endpoints: builder => ({
    getCatalogProduct: builder.query<CatalogProduct, string>({
      query: id => '/catalog/' + encodeURIComponent(id),
      providesTags: ['Catalog'],
    }),
    getListingDetail: builder.query<ListingDetail, string>({
      query: id => '/catalog/listings/' + encodeURIComponent(id),
      providesTags: ['Catalog'],
    }),
    searchCatalog: builder.query<{ data: CatalogProduct[]; pagination: Pagination }, CatalogSearch>({
      query: params => ({ url: '/catalog', params }),
      providesTags: ['Catalog'],
    }),
    getProductPharmacies: builder.query<{ product: CatalogProduct; pharmacies: ProductAvailability[]; pagination: Pagination }, PharmacySearch>({
      query: ({ productId, ...params }) => ({ url: '/catalog/' + encodeURIComponent(productId) + '/pharmacies', params }),
      providesTags: ['Catalog'],
    }),
  }),
});
export const { useGetCatalogProductQuery, useLazyGetCatalogProductQuery, useGetListingDetailQuery, useLazyGetListingDetailQuery, useSearchCatalogQuery, useLazySearchCatalogQuery, useGetProductPharmaciesQuery, useLazyGetProductPharmaciesQuery } = catalogApi;
