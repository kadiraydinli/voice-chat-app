import React, { useState } from 'react';
import { Navbar, RoomCard, CreateModal, RoomModal } from './components';

const App: React.FC = () => {
  const [showCreateUser, setShowCreateUser] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [show, setShow] = useState(false);

  const data = [1];

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <>
      <Navbar />
      <RoomModal visible={show} onClose={onClose} />
      <CreateModal type='user' visible={showCreateUser} onButton={() => setShowCreateUser(false)} />
      <CreateModal
        type='room'
        visible={showCreateRoom}
        onClose={() => setShowCreateRoom(false)}
        onButton={() => setShowCreateRoom(false)}
      />
      <div className='flex flex-wrap pt-16 px-1.5 pb-1.5'>
        <RoomCard createCard name={''} onPress={() => setShowCreateRoom(true)} />
        {data.map((_, index) => (
          <RoomCard key={`room-${index}`} name={`Room ${index}`} onPress={() => setShow(true)} />
        ))}
      </div>
    </>
  );
};

export default App;
