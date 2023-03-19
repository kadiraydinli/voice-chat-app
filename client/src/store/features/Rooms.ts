import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomsState {
  id: string | null;
  name: string;
  userId: string | null;
}

const initialState: RoomsState = {
  id: null,
  name: '',
  userId: null,
};

export const RoomsSlice = createSlice({
  name: 'RoomsSlice',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomsState>) => {
      state = action.payload;
    },
  },
});

export const { setRooms } = RoomsSlice.actions;
