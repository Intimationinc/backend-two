import React from 'react';
import { socket } from '../socket';
import ChannelBody from './ChannelBody';

export interface PublicMessage {
  user: string;
  content: string;
  timeStamp: Date;
  sender: string;
  type: 'public' | 'private';
  _id: string;
}

type Props = {
  isConnected: boolean;
};

const PublicChannel: React.FC<Props> = ({ isConnected }: Props) => {
  const [message, setMessage] = React.useState<string>('');
  const [publicMessages, setPublicMessages] = React.useState<PublicMessage[]>(
    [],
  );
  React.useEffect(() => {
    socket.on('recentPublicMessages', (messages: PublicMessage[]) => {
      setPublicMessages(messages);
    });

    socket.on('publicMessage', (message: PublicMessage) => {
      setPublicMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('recentPublicMessages');
      socket.off('publicMessage');
    };
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('publicMessage', message);
    setMessage('');
  };

  return (
    <div className='w-full flex-1 flex flex-col gap-4 align-middle ml-10'>
      <h3 className='text-3xl font-semibold text-center max-w-[720px]'>
        Public Channel
      </h3>
      <ChannelBody
        isConnected={isConnected}
        publicMessages={publicMessages}
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default PublicChannel;
