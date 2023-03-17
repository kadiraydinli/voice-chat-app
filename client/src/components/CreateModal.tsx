import React, { useState } from 'react';
import Button from './Button';
import Icon from './Icon';

type CreateTypes = 'room' | 'user';

interface CreateModal {
  type: CreateTypes;
  visible: boolean;
  onButton: (inputText: string) => void;
  onClose?: () => void;
}

const CreateModal: React.FC<CreateModal> = ({ type, visible, onButton, onClose }) => {
  const [text, setText] = useState<string>('');

  const texts = {
    user: {
      title: 'Create User',
      placeholder: 'User Name',
    },
    room: {
      title: 'Create Room',
      placeholder: 'Room Name',
    },
  };

  if (!visible) return null;

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    onButton(text);
  };

  const onClosePress = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClose && onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-1/3 bg-white rounded'>
        <div className='flex items-center justify-between border-b p-2'>
          <p className='ml-1'>{texts[type].title}</p>
          {type === 'room' && (
            <div className='cursor-pointer' onClick={onClosePress}>
              <Icon type='cancel' />
            </div>
          )}
        </div>
        <div className='p-3'>
          <input
            className='w-full border rounded p-2 mt-4 mb-6'
            type='text'
            placeholder={texts[type].placeholder}
            value={text}
            onChange={onChangeText}
          />
          <Button title='Create' onPress={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
