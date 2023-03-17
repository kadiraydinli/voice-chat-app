import React, { useEffect, useState } from 'react';
import ActionButton from '../ActionButton';
import { calculateWidth } from './helper';
import UserCard from './UserCard';

interface RoomModalProps {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ visible, onClose }) => {
  const [voiceOn, setVoiceOn] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset';
  }, [visible]);

  const data = [1, 2, 3, 4];

  if (!visible) return null;

  const calWidth = calculateWidth(data.length);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center overflow-hidden'>
      <div className='flex flex-col w-[90%] h-[90%] bg-white rounded'>
        <div className='flex items-center justify-between border-b p-2'>
          <p className='ml-1 text-xl'>{'ODA 1'}</p>
        </div>
        <div className='flex flex-1 p-3 flex-col overflow-hidden'>
          <div className='flex flex-1 flex-row flex-wrap overflow-scroll'>
            {data.map((_, index) => (
              <UserCard key={index} name='user' style={calWidth} />
            ))}
          </div>
          <div className='flex justify-center gap-10 pt-3'>
            <ActionButton
              type={voiceOn ? 'micOn' : 'micOff'}
              color={voiceOn ? 'gray' : 'red'}
              onPress={() => {
                setVoiceOn(!voiceOn);
              }}
            />
            <ActionButton type='roomLeave' onPress={onClose} color='red' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
