import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UISlice } from './features/UI';
import { UserSlice } from './features/User';
import { RoomsSlice } from './features/Rooms';

export const store = configureStore({
  reducer: {
    ui: UISlice.reducer,
    user: UserSlice.reducer,
    room: RoomsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
