import React, { useCallback, useEffect } from 'react';
import useOpenVidu from '../../hooks/useOpenVidu';
import { setMicrophoneOn, setModalVisible } from '../../store/features/UI';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ActionButton from '../ActionButton';
import { calculateWidth } from './helper';
import UserCard from './UserCard';

interface RoomModalProps {
  selectedRoomName: string;
}

const RoomModal: React.FC<RoomModalProps> = ({ selectedRoomName }) => {
  const { joinSession, onLeave, soundToggle, roomName, publisher, subscribers } = useOpenVidu();
  const {
    microphoneOn,
    modalVisible: { room: roomModalVisible },
  } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const onCloseRoomModal = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onLeave();
      dispatch(setModalVisible({ type: 'room', status: false }));
    },
    [dispatch, onLeave],
  );

  useEffect(() => {
    if (roomModalVisible) {
      joinSession(selectedRoomName);
    }
  }, [joinSession, onLeave, roomModalVisible, selectedRoomName]);

  useEffect(() => {
    document.body.style.overflow = roomModalVisible ? 'hidden' : 'unset';
  }, [roomModalVisible]);

  if (!roomModalVisible) return null;

  const users = [publisher, ...subscribers];

  const calWidth = calculateWidth(users.length);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center overflow-hidden'>
      <div className='flex flex-col w-[90%] h-[90%] bg-white rounded'>
        <div className='flex items-center justify-between border-b p-2'>
          <p className='ml-1 text-xl'>{roomName}</p>
        </div>
        <div className='flex flex-1 p-3 flex-col overflow-hidden'>
          <div className='flex flex-1 flex-row flex-wrap overflow-scroll'>
            {users.map((item, index) => (
              <UserCard key={index} user={item} style={calWidth} />
            ))}
          </div>
          <div className='flex justify-center gap-10 pt-3'>
            <ActionButton
              type={microphoneOn ? 'micOff' : 'micOn'}
              color={microphoneOn ? 'red' : 'gray'}
              onPress={() => {
                soundToggle();
                dispatch(setMicrophoneOn(!microphoneOn));
              }}
            />
            <ActionButton type='roomLeave' onPress={onCloseRoomModal} color='red' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
