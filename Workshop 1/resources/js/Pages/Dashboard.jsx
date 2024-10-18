import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ users, auth }) {
    const authUser = auth.user;

    const [notification, setNotification] = useState(null);



    useEffect(() => {

        Echo.private(`private.${authUser.id}`)
            .listen('SendPrivatePing', (e) => {
                setNotification(e.message);
                setTimeout(() => setNotification(null), 5000);
            });

    }, []);

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Welcome to Your Dashboard, {authUser.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Notification Box */}
            {notification && (
                <div className="fixed top-5 right-5 z-50">
                    <div className="flex items-center p-4 mb-4 text-white bg-blue-500 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
                        <span className="mr-2">{notification}</span>
                        <button
                            onClick={closeNotification}
                            className="ml-auto text-white focus:outline-none"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                        <div className="p-8 text-gray-900">
                            <h3 className="text-lg font-semibold text-gray-700 mb-6">User List</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {users.map((user) => (
                                    <div key={user.id} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out border">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {user.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Link method="get" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors" href={route('private.ping', user.id)}>
                                                Send Private Ping
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
