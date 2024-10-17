import { NextResponse } from 'next/server';
import useUserStore from '@/stores/useStore';

export async function middleware(req) {
  // Get token from Zustand store
  const { user } = useUserStore.getState(); 

  const { pathname } = req.nextUrl;

  // Protecting all routes under the /protected group
  if (pathname.startsWith('/((protected))')) {
    if (!user?.token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Protecting auth routes
  if (pathname.startsWith('/((auth))')) {
    if (user?.token) {
      // Redirect to dashboard if already authenticated
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// Exporting the config for the middleware
export const config = {
  matcher: ['/((protected))/:path*', '/((auth))/:path*'], // Apply middleware to protected and auth routes
};
