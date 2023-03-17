import React from 'react';
import {
  CancelIcon,
  ExitIcon,
  MicrophoneOffIcon,
  MicrophoneOnIcon,
  PlusIcon,
} from '../assets/icons';

const icons = {
  micOn: <MicrophoneOnIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />,
  micOff: <MicrophoneOffIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />,
  roomLeave: <ExitIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />,
  plus: <PlusIcon style={{ width: '3rem', height: '3rem' }} />,
  cancel: <CancelIcon style={{ width: 24, height: 24 }} />,
};

export type IconTypes = keyof typeof icons;

interface IconProps {
  type: IconTypes;
}

const Icon: React.FC<IconProps> = ({ type }) => {
  return icons[type];
};

export default Icon;
