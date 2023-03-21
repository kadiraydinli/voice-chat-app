import { Publisher, Subscriber } from 'openvidu-browser';
import React, { useEffect, useRef } from 'react';
import useOpenVidu from '../../hooks/useOpenVidu';

interface UserCardProps {
  user: Subscriber | Publisher | null;
  style?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, style }) => {
  const { getSubscriberName } = useOpenVidu();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && user) {
      user.addVideoElement(videoRef.current);
    }
  }, [user]);

  return (
    <div className={`flex p-2 ${style}`}>
      <div className='flex items-center justify-center w-full h-full border bg-white rounded-lg text-xl hover:bg-slate-200 animation transition-width'>
        {getSubscriberName(user)}
      </div>
      <audio autoPlay={true} ref={videoRef} />
    </div>
  );
};

export default UserCard;
