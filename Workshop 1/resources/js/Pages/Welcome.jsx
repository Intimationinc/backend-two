import {Head, Link, useForm} from '@inertiajs/react';
import {useEffect, useState} from "react";

export default function Welcome({messages}) {

    const { data, setData, post, reset } = useForm({
        message: '',
    });

    const [chatMessages, setChatMessages] = useState( messages ||[]);

    useEffect(() => {

        Echo.channel('public')
            .listen('SendPublicPing', (e) => {
                setChatMessages( (prevMsgs) => [...prevMsgs,e.message]);
            });
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route('public.ping'), {
            onSuccess: () => reset(),
        });
    };


    return (
        <>
            <Head title="Websocket" />
            {/* Public Chat Section */}
            <div className="container mx-auto">
                <div className="mt-8 bg-white shadow-lg rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Public Shout Box</h3>

                        {/* Chat Messages Display */}
                        <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-md mb-4">
                            {chatMessages.length ? (
                                chatMessages.map((msg, index) => (
                                    <div key={index} className="mb-2">
                                        <small className="font-medium text-blue-400">Anonymous : </small>
                                        {msg}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No messages yet.</p>
                            )}
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSendMessage}>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Type your message..."
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* login or registration button */}
                <div className="mt-8 text-center">
                    <Link href={route('login')} className="text-blue-600 hover:underline">Login</Link>
                    <span className="mx-2 text-gray-400">or</span>
                    <Link href={route('register')} className="text-blue-600 hover:underline">Register</Link>
                </div>
            </div>

        </>
    );
}
