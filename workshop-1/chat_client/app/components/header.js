"use client";

import { useState } from 'react';
import useUserStore from '@/stores/useStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE } from '@/app/utils/constant';
import socket from '../utils/socket';
import dayjs from 'dayjs';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  const setChannelCreated = useUserStore((state) => state.setChannelCreated);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [channelName, setChannelName] = useState(''); // Manage channel name input
  const [pinCode, setPinCode] = useState(''); // Manage pin code input
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect to login after logout
  };

  const handleCreateChannel = () => {
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmitChannel = async () => {
    // Validate inputs
    if (!channelName || !pinCode || isNaN(pinCode)) {
      alert('Please enter a valid channel name and pin code (digits only)');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(`${BASE}/channel/create`, {
        name: channelName,
        pin: pinCode,
        admin: user?.id, // Pass the current user ID as admin_id
      }, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        },
      });

      if (response.status === 201) {
        alert('Channel created successfully');
        setIsModalOpen(false); // Close the modal on success
        setChannelName(''); // Clear the inputs
        setPinCode('');
        setChannelCreated(true);
        socket.emit("channel",{
          channel_name: channelName,
          id: response?.data?.data?.channelId,
          admin_id: user?.id,
          created_at: dayjs().format("YYYY-MM-DD HH:MM:SS"),
          updated_at: dayjs().format("YYYY-MM-DD HH:MM:SS")
        })
      } else {
        console.error("Failed to create channel");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      alert('Error creating channel');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-lg font-bold text-white">My App</h1>

        <div className="flex items-center">
          {user ? (
            <>
              <span className="mr-4 text-white">Welcome, {user.username}</span>
              <button
                onClick={handleCreateChannel}
                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
              >
                Create Channel
              </button>
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

      {/* Modal for creating a channel */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          
          {/* Modal content */}
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create Channel</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Channel Name</label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter channel name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Pin Code</label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter pin code (digits only)"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitChannel}
                className={`px-4 py-2 text-sm text-white bg-blue-500 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
