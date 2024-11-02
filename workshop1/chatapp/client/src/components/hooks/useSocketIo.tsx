import React from 'react';
import { socket } from '../../socket';

const useSocketIo = () => {
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  React.useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);
  return isConnected;
};

export default useSocketIo;
