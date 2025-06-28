import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import salonSlice from './slices/salonSlice';
import bookingSlice from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    salon: salonSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;