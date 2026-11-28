import { baseApi } from '@/services/baseApi';
export interface Notification { id: string; userId: string; type: string; title: string; message: string; catalogRequestId: string | null; readAt: string | null; createdAt: string }
export const notificationsApi = baseApi.enhanceEndpoints({addTagTypes: ['Notifications']}).injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<{data: Notification[]; total: number}, boolean | void>({
      query: unread => ({url: '/notifications', params: unread === undefined ? undefined : {unread}}),
      providesTags: ['Notifications'],
    }),
    markNotificationRead: builder.mutation<{success: boolean}, string>({
      query: id => ({url: '/notifications/' + encodeURIComponent(id) + '/read', method: 'PATCH'}),
      invalidatesTags: ['Notifications'],
    }),
  }),
});
export const {useGetNotificationsQuery,useLazyGetNotificationsQuery,useMarkNotificationReadMutation} = notificationsApi;
