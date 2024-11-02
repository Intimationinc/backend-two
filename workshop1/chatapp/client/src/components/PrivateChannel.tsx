import React from 'react';
import ChannelBody from './ChannelBody';
import { socket } from '../socket';

export interface PrivateMessage {
  _id: string;
  sender: string;
  receiver: string;
  type: string;
  content: string;
  createdAt: Date;
  isAuthenticated: boolean;
}

type Props = {
  isConnected: boolean;
  sender: string | null;
  receiver: string;
};

const PrivateChannel = ({ sender, receiver, isConnected }: Props) => {
  const [message, setMessage] = React.useState<string>('');
  const [privateMessages, setPrivateMessages] = React.useState<
    PrivateMessage[]
  >([]);

  React.useEffect(() => {
    socket.emit('getPrivateMessages', receiver);
    socket.on('privateMessages', (messages: PrivateMessage[]) => {
      setPrivateMessages(messages);
    });

    socket.on('privateMessage', (message: PrivateMessage) => {
      setPrivateMessages((prev) => [...prev, message]);
    });

    socket.on('messageError', (errorMessage) => {
      console.error('Error getting private messages:', errorMessage);
    });

    return () => {
      socket.off('privateMessages');
      socket.off('messageError');
    };
  }, [receiver]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('privateMessage', {
      from: sender,
      to: receiver,
      content: message,
    });
    setMessage('');
  };
  return (
    <div className='w-full max-w-[720px] flex-1 flex flex-col gap-4 align-middle ml-10'>
      <h3 className='text-xl font-semibold text-center max-w-[720px]'>
        Sender: <em>{sender}</em> - Receiver:
        <em>{receiver || 'Not Selected'}</em>
      </h3>
      <ChannelBody
        isConnected={isConnected}
        privateMessages={privateMessages}
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default PrivateChannel;
