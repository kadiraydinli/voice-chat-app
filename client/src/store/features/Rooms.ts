import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/api';
import { StatusType } from '../types';

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
  const rooms = await axios.get(API_URL + '/rooms', {
    headers: { 'Content-Type': 'application/json' },
  });
  return rooms.data;
});

export interface RoomState {
  name: string;
  token: string;
}
export interface RoomsState {
  status: StatusType;
  rooms: string[];
  currentRoom: RoomState;
}

const initialState: RoomsState = {
  status: 'idle',
  rooms: [],
  currentRoom: {
    name: '',
    token: '',
  },
};

export const RoomsSlice = createSlice({
  name: 'RoomsSlice',
  initialState,
  reducers: {
    setRoomName: (state, action: PayloadAction<string>) => {
      state.currentRoom.name = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setRoomName } = RoomsSlice.actions;
