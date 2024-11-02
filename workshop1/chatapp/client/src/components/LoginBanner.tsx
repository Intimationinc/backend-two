import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from '@/components/Loginform';
import { Button } from '@/components/ui/button';
import { User } from '../App';

export interface SelectedUser {
  email: string;
  password: string;
}

type Props = {
  setIsAuthenticated: (authenticated: boolean) => void;
  setUser: (user: User | null) => void;
};

const LoginBanner: React.FC<Props> = ({
  setIsAuthenticated,
  setUser,
}: Props) => {
  const [selectedUser, setSelectedUser] = React.useState<SelectedUser | null>(
    null,
  );
  return (
    <div className='w-full flex-1 flex justify-center md:justify-end'>
      <Card className='mr-40 w-fit text-left border-none'>
        <CardHeader>
          <p className='font-light2'>A chat application for everyone</p>
          <CardTitle className='text-3xl md:text-5xl font-bold py-3.5'>
            Join the conversation
          </CardTitle>
          <CardDescription className='text-3xl font-medium'>
            Login to start private chats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            selectedUser={selectedUser}
            setUser={setUser}
            setIsAuthenticated={setIsAuthenticated}
          />
        </CardContent>
        <CardFooter className='space-x-5'>
          <p>Choose User:</p>
          <div className='flex gap-3'>
            <Button
              type='button'
              onClick={() =>
                setSelectedUser({
                  email: 'tushar@email.com',
                  password: 'qwer1234',
                })
              }
              variant='secondary'
              className='text-base'
            >
              Tushar
            </Button>
            <Button
              type='button'
              onClick={() =>
                setSelectedUser({
                  email: 'rafi@email.com',
                  password: 'qwer1234',
                })
              }
              variant='secondary'
              className='text-base'
            >
              Rafi
            </Button>
            <Button
              type='button'
              onClick={() =>
                setSelectedUser({
                  email: 'sabbir@email.com',
                  password: 'qwer1234',
                })
              }
              variant='secondary'
              className='text-base'
            >
              Sabbir
            </Button>
            <Button
              type='button'
              onClick={() =>
                setSelectedUser({
                  email: 'jamal@email.com',
                  password: 'qwer1234',
                })
              }
              variant='secondary'
              className='text-base'
            >
              Jamal
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginBanner;
