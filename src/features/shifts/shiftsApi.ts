import { baseApi } from '@/services/baseApi';
import type { Pharmacy } from '@/features/pharmacies/pharmacyApi';

type Envelope<T> = { data: T };
export interface Shift { id: string; name: string | null; code: string | null }
export interface ShiftInput { name?: string; code?: string }
export type ShiftGroup = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L';
export interface Anchor { day: number; group: ShiftGroup }
export interface AnnualShiftConfig {
  year: number; january: ShiftGroup[]; february: ShiftGroup[];
  januaryAnchor: Anchor; februaryAnchor: Anchor; generalAnchor: Anchor;
}
export interface ShiftCalendar {
  year: number; month: number;
  rule: { id: string; name: string; priority: number };
  days: { date: string; group: string; shiftId: string; pharmacies: Pharmacy[] }[];
}
export const shiftsApi = baseApi.enhanceEndpoints({ addTagTypes: ['Shifts','ShiftCalendar','Pharmacy'] }).injectEndpoints({
  endpoints: builder => ({
    getShifts: builder.query<Shift[], void>({
      query: () => '/shifts',
      transformResponse: (r: Envelope<Shift[]>) => r.data,
      providesTags: ['Shifts'],
    }),
    getShift: builder.query<Shift, string>({
      query: id => '/shifts/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<Shift>) => r.data,
      providesTags: ['Shifts'],
    }),
    createShift: builder.mutation<Shift, ShiftInput>({
      query: body => ({ url: '/shifts', method: 'POST', body }),
      transformResponse: (r: Envelope<Shift>) => r.data,
      invalidatesTags: ['Shifts','ShiftCalendar','Pharmacy'],
    }),
    updateShift: builder.mutation<Shift, { id: string; body: ShiftInput }>({
      query: ({ id, body }) => ({ url: '/shifts/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (r: Envelope<Shift>) => r.data,
      invalidatesTags: ['Shifts','ShiftCalendar','Pharmacy'],
    }),
    deleteShift: builder.mutation<null, string>({
      query: id => ({ url: '/shifts/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['Shifts','ShiftCalendar','Pharmacy'],
    }),
    getShiftCalendar: builder.query<ShiftCalendar, { year: number; month: number }>({
      query: params => ({ url: '/shifts/calendar', params }),
      transformResponse: (r: Envelope<ShiftCalendar>) => r.data,
      providesTags: ['ShiftCalendar','Pharmacy'],
    }),
    configureAnnualShifts: builder.mutation<{ year: number }, AnnualShiftConfig>({
      query: body => ({ url: '/shifts/calendar/annual', method: 'PUT', body }),
      transformResponse: (r: Envelope<{ year: number }>) => r.data,
      invalidatesTags: ['ShiftCalendar','Pharmacy'],
    }),
  }),
});
export const { useGetShiftsQuery, useLazyGetShiftsQuery, useGetShiftQuery, useCreateShiftMutation, useUpdateShiftMutation, useDeleteShiftMutation, useGetShiftCalendarQuery, useLazyGetShiftCalendarQuery, useConfigureAnnualShiftsMutation } = shiftsApi;
