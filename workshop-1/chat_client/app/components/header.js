"use client";

import useUserStore from '@/stores/useStore';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <h1 className="text-lg font-bold text-white">My App</h1>

      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4 text-white">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
