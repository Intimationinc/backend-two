import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { PublicMessage } from './PublicChannel';
import { PrivateMessage } from './PrivateChannel';

interface Props {
  isConnected: boolean;
  publicMessages?: PublicMessage[];
  privateMessages?: PrivateMessage[];
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChannelBody = ({
  handleSubmit,
  message,
  setMessage,
  isConnected,
  publicMessages,
  privateMessages,
}: Props) => {
  return (
    <>
      <ScrollArea className='w-full max-w-[720px] p-5 h-[480px] border border-muted-foreground/50 bg-muted/50 rounded-lg'>
        <ul className='list-none'>
          {!isConnected ? (
            'Not Connected'
          ) : publicMessages && publicMessages.length > 0 ? (
            publicMessages.map((message) => (
              <li key={message._id}>
                Guest-{message.sender} : {message.content}
              </li>
            ))
          ) : privateMessages && privateMessages.length > 0 ? (
            privateMessages.map((message) => (
              <li key={message._id}>
                {message.sender}: {message.content}
              </li>
            ))
          ) : (
            <li>No messages yet</li>
          )}
        </ul>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[720px] p-2.5 border border-muted-foreground/50 bg-muted rounded-lg flex gap-3'
      >
        <Input
          type='text'
          placeholder='Enter message'
          className='w-full flex-1 min-h-14 px-4'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type='submit'
          className='flex-1 max-w-40 min-h-14 h-auto text-lg [&_svg]:size-5'
        >
          <Send /> Send
        </Button>
      </form>
    </>
  );
};

export default ChannelBody;
