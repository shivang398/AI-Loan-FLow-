import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import messagingReducer from './slices/messagingSlice';
import teamMeetingReducer from './slices/teamMeetingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messaging: messagingReducer,
    teamMeeting: teamMeetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
