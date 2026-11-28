import { baseApi } from '@/services/baseApi';

type Envelope<T> = { data: T };
export interface WeeklyInterval { dayOfWeek: number; opensAt: string; closesAt: string }
export interface Pharmacy {
  id: string; name: string | null; adress: string | null;
  lat: string | number | null; lng: string | number | null; phone: string | null;
  weeklyHours: WeeklyInterval[]; open24Hours: boolean;
  openingDays: string | null; openingTime: string | null; closingTime: string | null;
  shift?: { id: string; code: string } | null;
}
export interface PharmacyInput {
  name?: string; adress?: string; lat?: number | null; lng?: number | null;
  phone?: string | null; weeklyHours?: WeeklyInterval[]; open24Hours?: boolean;
  openingDays?: string | null; openingTime?: string | null; closingTime?: string | null;
  idShift?: string | null;
}
export interface PharmacySearch {
  search?: string; name?: string; address?: string; idShift?: string; shiftCode?: string;
  hasShift?: boolean; hasCoordinates?: boolean; hasProducts?: boolean; favoritesOnly?: boolean;
  onDuty?: boolean; openNow?: boolean; dutyDate?: string; productName?: string;
  idCategory?: string; idLaboratory?: string; page?: number; limit?: number;
  lat?: number; lng?: number; radiusKm?: number;
  orderBy?: 'name' | 'address' | 'distance' | 'id'; order?: 'ASC' | 'DESC';
}
export interface Page<T> { data: T[]; total: number; page: number; limit: number; totalPages: number }
export interface Availability {
  onDuty: boolean; openNow: boolean; status: 'ON_DUTY' | 'OPEN' | 'CLOSED';
  nextOpeningAt: string | null; nextClosingAt: string | null;
  minutesUntilNextOpening: number | null; minutesUntilNextClosing: number | null;
}
export interface PharmacyAvailability extends Availability {
  id: string; name: string | null; address: string | null; phone: string | null;
  lat: string | number | null; lng: string | number | null;
  shiftCode: string | null; weeklyHours: WeeklyInterval[]; open24Hours: boolean;
  dutyEndsAt: string | null; calendarAvailable: boolean; checkedAt: string; timeZone: string;
}
export interface NearbyPharmacy extends Availability {
  id: string; name: string | null; address: string | null; lat: number; lng: number;
  distanceKm: number; weeklyHours: WeeklyInterval[]; open24Hours: boolean;
}
export type NearbySearch = { lat: number; lng: number; radiusKm?: number; page?: number; limit?: number };
export type NearbyResult = Page<NearbyPharmacy> & { checkedAt: string; timeZone: string };
export type PharmacyHours = { weeklyHours: WeeklyInterval[]; open24Hours: boolean };

export const pharmacyApi = baseApi.enhanceEndpoints({ addTagTypes: ['Pharmacy', 'Catalog'] }).injectEndpoints({
  endpoints: builder => ({
    getPharmacies: builder.query<Page<Pharmacy>, PharmacySearch | void>({
      query: params => ({ url: '/pharmacys', params: params || undefined }),
      transformResponse: (response: Envelope<Page<Pharmacy>>) => response.data,
      providesTags: ['Pharmacy'],
    }),
    getPharmacy: builder.query<Pharmacy, string>({
      query: id => '/pharmacys/' + encodeURIComponent(id),
      transformResponse: (response: Envelope<Pharmacy>) => response.data,
      providesTags: ['Pharmacy'],
    }),
    getNearbyPharmacies: builder.query<NearbyResult, NearbySearch>({
      query: params => ({ url: '/pharmacys/nearby', params }),
      transformResponse: (response: Envelope<NearbyResult>) => response.data,
      providesTags: ['Pharmacy'],
    }),
    getPharmacyAvailability: builder.query<PharmacyAvailability, string>({
      query: id => '/pharmacys/' + encodeURIComponent(id) + '/availability',
      transformResponse: (response: Envelope<PharmacyAvailability>) => response.data,
      providesTags: ['Pharmacy'],
    }),
    createPharmacy: builder.mutation<Pharmacy, PharmacyInput>({
      query: body => ({ url: '/pharmacys', method: 'POST', body }),
      transformResponse: (response: Envelope<Pharmacy>) => response.data,
      invalidatesTags: ['Pharmacy', 'Catalog'],
    }),
    updatePharmacy: builder.mutation<Pharmacy, { id: string; body: PharmacyInput }>({
      query: ({ id, body }) => ({ url: '/pharmacys/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (response: Envelope<Pharmacy>) => response.data,
      invalidatesTags: ['Pharmacy', 'Catalog'],
    }),
    updatePharmacyHours: builder.mutation<PharmacyHours & { id: string }, { id: string; body: PharmacyHours }>({
      query: ({ id, body }) => ({ url: '/pharmacys/' + encodeURIComponent(id) + '/hours', method: 'PUT', body }),
      transformResponse: (response: Envelope<PharmacyHours & { id: string }>) => response.data,
      invalidatesTags: ['Pharmacy', 'Catalog'],
    }),
    deletePharmacy: builder.mutation<null, string>({
      query: id => ({ url: '/pharmacys/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (response: Envelope<null>) => response.data,
      invalidatesTags: ['Pharmacy', 'Catalog'],
    }),
  }),
});
export const {
  useGetPharmaciesQuery, useLazyGetPharmaciesQuery, useGetPharmacyQuery, useLazyGetPharmacyQuery,
  useGetNearbyPharmaciesQuery, useLazyGetNearbyPharmaciesQuery,
  useGetPharmacyAvailabilityQuery, useLazyGetPharmacyAvailabilityQuery,
  useCreatePharmacyMutation, useUpdatePharmacyMutation, useUpdatePharmacyHoursMutation, useDeletePharmacyMutation,
} = pharmacyApi;
