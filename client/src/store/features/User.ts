import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  name: string;
}

const initialState: UserState = {
  id: null,
  name: '',
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
