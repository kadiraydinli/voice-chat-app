import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <button
      className={`w-full px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg animation text-white ${style}`}
      onClick={onPress}
    >
      {title}
    </button>
  );
};

export default Button;
