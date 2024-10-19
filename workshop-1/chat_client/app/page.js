"use client";

import useUserStore from '@/stores/useStore';
import Login from './(auth)/login/page';
import Chat from './(protected)/home/page';

export default function Home() {
  const user = useUserStore((state) => state.user); // Access the user data

  return (
    <div>
      {user ? (
        <Chat/>
      ) : (
        <Login/>
      )}
    </div>
  );
}
