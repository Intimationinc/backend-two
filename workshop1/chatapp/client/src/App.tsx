import React from 'react';
import './App.css';
import useSocketIo from './components/hooks/useSocketIo';
import LoginBanner from './components/LoginBanner';
import PublicChannel from './components/PublicChannel';
import Contacts from './components/Contacts';
import PrivateChannel from './components/PrivateChannel';
import { socket } from './socket';

export type User = {
  email: string;
  isOnline: boolean;
};

function App() {
  const isConnected = useSocketIo();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [receiver, setReceiver] = React.useState('');

  React.useEffect(() => {
    socket.on('disconnect', () => {
      setIsAuthenticated(false);
      setUser(null);
    });
  }, []);
  return (
    <main className='w-full p-5 h-full flex flex-col md:flex-row items-start md:items-center justify-center'>
      {!isAuthenticated && !user ? (
        <>
          <LoginBanner
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
          />
          <PublicChannel isConnected={isConnected} />
        </>
      ) : (
        <>
          <Contacts setReceiver={setReceiver} user={user} />
          <PrivateChannel
            isConnected={isConnected}
            sender={user && user.email}
            receiver={receiver}
          />
        </>
      )}
    </main>
  );
}

export default App;
