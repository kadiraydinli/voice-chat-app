import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalVisibleState {
  room: boolean;
  createUser: boolean;
  createRoom: boolean;
}

export type ModalVisibleTypes = keyof ModalVisibleState;
type ModalVisibleActionType = { type: ModalVisibleTypes; status: boolean };

export interface UIState {
  microphoneOn: boolean;
  modalVisible: ModalVisibleState;
}

const initialState: UIState = {
  microphoneOn: false,
  modalVisible: {
    room: false,
    createUser: true,
    createRoom: false,
  },
};

export const UISlice = createSlice({
  name: 'UISlice',
  initialState,
  reducers: {
    setMicrophoneOn: (state, action: PayloadAction<boolean>) => {
      state.microphoneOn = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<ModalVisibleActionType>) => {
      state.modalVisible[action.payload.type] = action.payload.status;
    },
  },
});

export const { setMicrophoneOn, setModalVisible } = UISlice.actions;
