import React from 'react';
import Icon from './Icon';

interface RoomCardProps {
  createCard?: boolean;
  name: string;
  onPress: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ createCard, name, onPress }) => {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-48 p-1.5 transition-width'>
      <div
        className='w-full h-full flex items-center justify-center rounded-lg bg-gray-200 border border-black cursor-pointer text-lg hover:bg-gray-300 animation'
        onClick={onPress}
      >
        {createCard ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <Icon type='plus' />
            <span>Create New Room</span>
          </div>
        ) : (
          name
        )}
      </div>
    </div>
  );
};

export default RoomCard;
