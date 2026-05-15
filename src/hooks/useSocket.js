import { useEffect } from 'react';
import io from 'socket.io-client';
import { useFundStore } from '../store';

const socket = io('http://localhost:4000');   // Backend later

export const useSocket = () => {
  const addTrace = useFundStore((state) => state.addTrace);

  useEffect(() => {
    socket.on('trace', (data) => {
      addTrace(data);
    });

    return () => socket.off('trace');
  }, []);

  return socket;
};