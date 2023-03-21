import axios from 'axios';
import { OpenVidu, Publisher, Session, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { API_URL } from '../api/api';
import { setRoomName } from '../store/features/Rooms';
import { clearUser, setUser } from '../store/features/User';
import { useAppDispatch, useAppSelector } from '../store/store';

const useOpenVidu = () => {
  const OVRef = useRef<OpenVidu | null>(null);
  const instanceRef = useRef<Session>();
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const { microphoneOn } = useAppSelector((state) => state.ui);
  const { name: userName } = useAppSelector((state) => state.user);
  const { name: roomName } = useAppSelector((state) => state.room.currentRoom);
  const dispatch = useAppDispatch();

  const tokenGenerate = async (roomName: string) => {
    const createSession = await axios.post(
      API_URL + '/sessions',
      { customSessionId: roomName },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const response = await axios.post(
      API_URL + '/sessions/' + createSession.data + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data;
  };

  const joinSession = useCallback(
    async (joinRoomName?: string) => {
      if (!OVRef.current) {
        OVRef.current = new OpenVidu();
      }
      OVRef.current.enableProdMode();
      const newSession = OVRef.current.initSession();

      newSession.on('streamCreated', (event) => {
        const subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers((prev) => [...prev, subscriber]);
      });

      newSession.on('streamDestroyed', (event) => {
        setSubscribers((prev) => prev.filter(({ stream }) => stream !== event.stream));
      });

      newSession.on('exception', (exception) => {
        console.warn(exception);
      });

      const token = await tokenGenerate(joinRoomName || roomName);

      await newSession.connect(token, { clientData: userName });

      const _publisher: Publisher = await OVRef.current.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: false,
        publishAudio: true,
      });

      newSession.publish(_publisher);
      instanceRef.current = newSession;
      setPublisher(_publisher);
    },
    [roomName, userName],
  );

  const onLeave = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.disconnect();
      OVRef.current = null;
      setSubscribers([]);
      setPublisher(null);
      dispatch(clearUser());
    }
  }, [instanceRef, dispatch]);

  const onChangeRoomText = useCallback(
    (text: string) => {
      dispatch(setRoomName(text));
    },
    [dispatch],
  );

  const onChangeUserNameText = useCallback(
    (text: string) => {
      dispatch(setUser(text));
    },
    [dispatch],
  );

  const soundToggle = useCallback(() => {
    publisher?.publishAudio(microphoneOn);
  }, [microphoneOn, publisher]);

  const getSubscriberName = useCallback((user: Subscriber | Publisher | null): string => {
    if (user) {
      return JSON.parse(user.stream.connection.data).clientData;
    }

    return '';
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', onLeave);
    return () => {
      window.removeEventListener('beforeunload', onLeave);
    };
  }, [onLeave]);

  return {
    soundToggle,
    onChangeRoomText,
    onChangeUserNameText,
    getSubscriberName,
    joinSession,
    onLeave,
    userName,
    roomName,
    publisher,
    subscribers,
  };
};

export default useOpenVidu;
