import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
      <Link href="/login">
        <a className="mt-6 text-blue-600 hover:underline">
          Go back home
        </a>
      </Link>
    </div>
  );
}
