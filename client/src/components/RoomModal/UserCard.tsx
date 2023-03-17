import React from 'react';

interface UserCardProps {
  name: string;
  style?: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, style }) => {
  return (
    <div className={`flex p-2 ${style}`}>
      <div className='flex items-center justify-center w-full h-full border bg-white rounded-lg text-xl hover:bg-slate-200 animation'>
        {name}
      </div>
    </div>
  );
};

export default UserCard;
