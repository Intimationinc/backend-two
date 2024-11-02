import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { socket } from '../socket';
import { User } from '../App';

type Props = {
  setReceiver: (email: string) => void;
  user: User | null;
};

interface Contact {
  _id: string;
  email: string;
  isOnline: boolean;
  socketId: string;
}

const Contacts = ({ setReceiver, user }: Props) => {
  const [contactList, setContactList] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    socket.on('activeUsers', (res) => {
      const activeUsers: Contact[] = res.filter(
        (contact: Contact) => contact.email !== user?.email,
      );
      setContactList(activeUsers);
    });

    return () => {
      socket.off('activeUsers');
    };
  }, []);

  const selectReceiver = (email: string) => {
    setReceiver(email);
  };
  return (
    <div className='w-full space-y-3 grid max-w-96'>
      {contactList.map((contact) => (
        <Card
          key={contact.email}
          className='w-fit flex items-center gap-5 px-10 py-3'
        >
          <img
            src='https://avatar.iran.liara.run/public/boy'
            alt={contact.email}
            className='w-24 h-24 rounded-full'
          />
          <CardContent className='space-y-3 pb-0'>
            <h3>{contact.email.split('@')[0]}</h3>
            <Badge
              variant='default'
              className={contact.isOnline ? 'bg-green-500' : 'bg-red-500'}
            >
              {contact.isOnline ? 'Online' : 'Offline'}
            </Badge>
            <Button
              variant='outline'
              size='lg'
              onClick={() => selectReceiver(contact.email)}
            >
              Message
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Contacts;
