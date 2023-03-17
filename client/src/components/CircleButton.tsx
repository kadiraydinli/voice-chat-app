import React from 'react';

type CircleButtonType = 'microPhoneOn' | 'microPhoneOff' | 'roomLeave';

interface CircleButtonProps {
  type: CircleButtonType;
  onPress: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ type }) => {
  const onPress = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <div className='w-20 h-20 rounded-full p-4 flex items-center justify-between' onClick={onPress}>
      {type === 'microPhoneOn' && <i></i>}
      {type === 'microPhoneOff' && <i></i>}
      {type === 'roomLeave' && <i></i>}
    </div>
  );
};

export default CircleButton;
