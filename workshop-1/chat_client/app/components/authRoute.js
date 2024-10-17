"use client";

import useUserStore from '@/stores/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useUserStore();
  
  useEffect(() => {
    // If there is a token, redirect to the protected route
    if (user?.token) {
      router.push('/home');
    }
  }, [user?.token, router]);

  // Only render the children if not authenticated
  if (user?.token) {
    return null;  // Don't render the auth component if authenticated
  }

  return <>{children}</>;
};

export default AuthRoute;
