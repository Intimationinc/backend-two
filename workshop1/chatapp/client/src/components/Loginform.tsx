import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectedUser } from '@/components/LoginBanner';
import { User } from '../App';
import { socket } from '../socket';

interface Props {
  selectedUser: SelectedUser | null;
  setIsAuthenticated: (authenticated: boolean) => void;
  setUser: (user: User | null) => void;
}

export default function LoginForm({
  selectedUser,
  setUser,
  setIsAuthenticated,
}: Props) {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (selectedUser) {
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
    }
  }, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('login', { email, password });
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { success, user } = await response.json();
      startTransition(() => {
        setIsAuthenticated(success);
        setUser(user);
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid gap-4 my-5'>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='m@example.com'
          required
          disabled={isPending}
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      <div className='flex justify-start'>
        <Button type='submit' disabled={isPending}>
          Login
        </Button>
      </div>
    </form>
  );
}
