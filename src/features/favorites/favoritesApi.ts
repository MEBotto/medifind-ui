import { baseApi } from '@/services/baseApi';
import type { Pharmacy } from '@/features/pharmacies/pharmacyApi';
export interface Favorite { id: string; active: boolean; pharmacy?: Pharmacy }
type Envelope<T> = {data: T};
export const favoritesApi = baseApi.enhanceEndpoints({addTagTypes: ['Favorites','Pharmacy']}).injectEndpoints({
  endpoints: builder => ({
    getFavorites: builder.query<Favorite[], void>({
      query: () => '/favouritepharmacys',
      transformResponse: (r: Envelope<Favorite[]>) => r.data,
      providesTags: ['Favorites'],
    }),
    getFavorite: builder.query<Favorite, string>({
      query: id => '/favouritepharmacys/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<Favorite>) => r.data,
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation<Favorite, string>({
      query: idPharmacy => ({url: '/favouritepharmacys', method: 'POST', body: {idPharmacy}}),
      transformResponse: (r: Envelope<Favorite>) => r.data,
      invalidatesTags: ['Favorites','Pharmacy'],
    }),
    updateFavorite: builder.mutation<Favorite, {id: string; active: boolean}>({
      query: ({id, active}) => ({url: '/favouritepharmacys/' + encodeURIComponent(id), method: 'PUT', body: {active}}),
      transformResponse: (r: Envelope<Favorite>) => r.data,
      invalidatesTags: ['Favorites','Pharmacy'],
    }),
    deleteFavorite: builder.mutation<null, string>({
      query: id => ({url: '/favouritepharmacys/' + encodeURIComponent(id), method: 'DELETE'}),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['Favorites','Pharmacy'],
    }),
  }),
});
export const {useGetFavoritesQuery,useLazyGetFavoritesQuery,useGetFavoriteQuery,useAddFavoriteMutation,useUpdateFavoriteMutation,useDeleteFavoriteMutation} = favoritesApi;
