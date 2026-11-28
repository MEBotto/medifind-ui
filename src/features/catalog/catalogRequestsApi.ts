import { baseApi } from '@/services/baseApi';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ProductPayload = { name: string; description?: string; barcode?: string; presentation?: string; dose?: number; unit?: string; laboratoryId?: string; categoryId?: string; parentRequestId?: string };
export type CatalogRequestInput = { type: 'PRODUCT'; payload: ProductPayload } | { type: 'LABORATORY' | 'CATEGORY'; payload: { name: string } };
export type CatalogRequest = CatalogRequestInput & { id: string; status: RequestStatus; createdAt: string; reviewedAt: string | null; rejectionReason: string | null };
export type Review = { decision: 'APPROVE' } | { decision: 'REJECT'; reason: string };
export const catalogRequestsApi = baseApi.enhanceEndpoints({addTagTypes: ['CatalogRequests','Catalog','Inventory','Category','Laboratory','Notifications']}).injectEndpoints({
  endpoints: builder => ({
    getCatalogRequests: builder.query<CatalogRequest[], RequestStatus | void>({
      query: status => ({url: '/catalog-requests', params: status ? {status} : undefined}),
      providesTags: ['CatalogRequests'],
    }),
    createCatalogRequest: builder.mutation<CatalogRequest, CatalogRequestInput>({
      query: body => ({url: '/catalog-requests', method: 'POST', body}),
      invalidatesTags: ['CatalogRequests'],
    }),
    reviewCatalogRequest: builder.mutation<CatalogRequest, {id: string; body: Review}>({
      query: ({id, body}) => ({url: '/catalog-requests/' + encodeURIComponent(id) + '/review', method: 'PATCH', body}),
      invalidatesTags: ['CatalogRequests','Catalog','Inventory','Category','Laboratory','Notifications'],
    }),
  }),
});
export const {useGetCatalogRequestsQuery,useLazyGetCatalogRequestsQuery,useCreateCatalogRequestMutation,useReviewCatalogRequestMutation} = catalogRequestsApi;
