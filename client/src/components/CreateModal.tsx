import React, { useMemo } from 'react';
import useOpenVidu from '../hooks/useOpenVidu';
import Button from './Button';
import Icon from './Icon';

type CreateTypes = 'room' | 'user';

interface CreateModal {
  type: CreateTypes;
  visible: boolean;
  onButton: () => void;
  onClose?: () => void;
}

const CreateModal: React.FC<CreateModal> = ({ type, visible, onButton, onClose }) => {
  const { userName, roomName, onChangeUserNameText, onChangeRoomText } = useOpenVidu();

  const text = useMemo((): string => {
    return type === 'user' ? userName : roomName;
  }, [type, userName, roomName]);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onButton();
    } else {
      alert(`Please enter ${type} name`);
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'user') {
      onChangeUserNameText(e.target.value);
    }
    if (type === 'room') {
      onChangeRoomText(e.target.value);
    }
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
        <form className='p-3' onSubmit={onSubmit}>
          <input
            className='w-full border rounded p-2 mt-4 mb-6'
            type='text'
            placeholder={texts[type].placeholder}
            value={text}
            onChange={onChangeText}
          />
          <Button title='Create' />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
