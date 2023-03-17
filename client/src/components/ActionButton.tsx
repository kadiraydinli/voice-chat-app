import React from 'react';
import Icon, { IconTypes } from './Icon';

interface ActionButtonProps {
  type: IconTypes;
  color?: 'red' | 'gray';
  onPress: (e: React.MouseEvent<HTMLElement>) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, color = 'gray', onPress }) => {
  const backgroundColor = {
    red: 'bg-red-400 hover:bg-red-500',
    gray: 'bg-slate-400 hover:bg-slate-500',
  };
  return (
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full ${backgroundColor[color]} cursor-pointer animation`}
      onClick={onPress}
    >
      <Icon type={type} />
    </div>
  );
};

export default ActionButton;
