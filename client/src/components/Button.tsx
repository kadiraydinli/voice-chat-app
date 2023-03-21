import React from 'react';

interface ButtonProps {
  title: string;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ title, style }) => {
  return (
    <button
      type='submit'
      className={`w-full px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg animation text-white ${style}`}
    >
      {title}
    </button>
  );
};

export default Button;
