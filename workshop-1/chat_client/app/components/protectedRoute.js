"use client";

import useUserStore from '@/stores/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useUserStore();
  
  useEffect(() => {
    // If there's no token, redirect to login
    if (!user?.token) {
      router.push('/login');
    }
  }, [user?.token, router]);

  // Only render children if the user is authenticated
  if (!user?.token) {
    return null;  // Don't render the protected component if not authenticated
  }

  return <>{children}</>;
};

export default ProtectedRoute;
