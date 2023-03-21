import React, { useCallback, useEffect, useState } from 'react';
import { CreateModal, Navbar, RoomCard, RoomModal } from '../components';
import { getRooms } from '../store/features/Rooms';
import { setModalVisible } from '../store/features/UI';
import { useAppDispatch, useAppSelector } from '../store/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const { createUser: createUserModalVisible, createRoom: createRoomModalVisible } = useAppSelector(
    (state) => state.ui.modalVisible,
  );
  const rooms = useAppSelector((state) => state.room.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  const onCreateRoom = useCallback(
    (status: boolean) => {
      if (!status) {
        dispatch(setModalVisible({ type: 'room', status: true }));
      }
      dispatch(setModalVisible({ type: 'createRoom', status }));
    },
    [dispatch],
  );

  const onRoomPress = useCallback(
    (item: string) => {
      dispatch(setModalVisible({ type: 'room', status: true }));
      setSelectedRoomName(item);
    },
    [dispatch],
  );

  return (
    <>
      <Navbar />
      <RoomModal selectedRoomName={selectedRoomName} />
      <CreateModal
        type='user'
        visible={createUserModalVisible}
        onButton={() => dispatch(setModalVisible({ type: 'createUser', status: false }))}
      />
      <CreateModal
        type='room'
        visible={createRoomModalVisible}
        onClose={() => dispatch(setModalVisible({ type: 'createRoom', status: false }))}
        onButton={() => onCreateRoom(false)}
      />
      <div className='flex flex-wrap pt-16 px-1.5 pb-1.5'>
        <RoomCard createCard name={''} onPress={() => onCreateRoom(true)} />
        {rooms.map((item, index) => (
          <RoomCard key={`room-${index}`} name={item} onPress={() => onRoomPress(item)} />
        ))}
      </div>
    </>
  );
};

export default Home;
