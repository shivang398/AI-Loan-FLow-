import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamMeetingReducer from './slices/teamMeetingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teamMeeting: teamMeetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
