import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearUser: (state) => {
      state.name = '';
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
