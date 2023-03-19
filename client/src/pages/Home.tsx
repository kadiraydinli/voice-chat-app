import React, { useCallback } from 'react';
import { Navbar, RoomCard, CreateModal, RoomModal } from '../components';
import { setModalVisible } from '../store/features/UI';
import { useAppDispatch, useAppSelector } from '../store/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    room: roomModalVisible,
    createUser: createUserModalVisible,
    createRoom: createRoomModalVisible,
  } = useAppSelector((state) => state.ui.modalVisible);

  const data = [1];

  const onCloseRoomModal = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(setModalVisible({ type: 'room', status: false }));
    },
    [dispatch],
  );

  const onCreateRoom = useCallback(
    (status: boolean) => {
      dispatch(setModalVisible({ type: 'createRoom', status }));
    },
    [dispatch],
  );

  return (
    <>
      <Navbar />
      <RoomModal visible={roomModalVisible} onClose={onCloseRoomModal} />
      <CreateModal
        type='user'
        visible={createUserModalVisible}
        onButton={() => dispatch(setModalVisible({ type: 'createUser', status: false }))}
      />
      <CreateModal
        type='room'
        visible={createRoomModalVisible}
        onClose={() => onCreateRoom(false)}
        onButton={() => onCreateRoom(false)}
      />
      <div className='flex flex-wrap pt-16 px-1.5 pb-1.5'>
        <RoomCard createCard name={''} onPress={() => onCreateRoom(true)} />
        {data.map((_, index) => (
          <RoomCard
            key={`room-${index}`}
            name={`Room ${index}`}
            onPress={() => dispatch(setModalVisible({ type: 'room', status: true }))}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
