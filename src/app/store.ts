import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import { baseApi } from '@/services/baseApi';
export const store = configureStore({
  reducer: { auth: authReducer, [baseApi.reducerPath]: baseApi.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: false,
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
