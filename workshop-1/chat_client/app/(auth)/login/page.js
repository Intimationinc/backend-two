"use client"
import React, { useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/useStore';
import { useRouter } from 'next/navigation';
import AuthRoute from '@/app/components/authRoute';
import { BASE } from '@/app/utils/constant';

export default function Login() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser); // Access the setUser function from Zustand
    const { user } = useUserStore();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setError('');
        setLoading(true);

        try {
            const apiUrl = `${BASE}/user/login`;

            // Call the login API
            const response = await axios.post(apiUrl, { email, password });


            // Redirect the user to the home page after login
            if (response?.status === 200) {

                // Store user data in Zustand after successful login
                setUser(response?.data?.data || {}); // Assuming the response contains the user info
                router.push('/home');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthRoute>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-900">Log In</h2>

                    {error && (
                        <div className="p-4 text-red-600 bg-red-100 rounded">{error}</div>
                    )}

                    <div className="space-y-6">
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </AuthRoute>
    );
}
