import React from 'react';
import useUserStore from '@/stores/useStore';
import dayjs from 'dayjs';

function MessageCard({ senderId, senderName, message, createdAt }) {
  // Get the logged-in user from Zustand
  const { user } = useUserStore();

  // Check if the message is sent by the logged-in user
  const isMyMessage = user?.id === senderId;

  return (
    <div className={`flex mb-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      {/* Message bubble */}
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
          isMyMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {/* Sender info */}
        <div className="text-base font-bold mb-1">
          {isMyMessage ? 'You' : senderName}
        </div>
        {/* Message message */}
        <div>{message}</div>
        {/* Timestamp */}
        <div className="text-xs mt-1 text-gray-500 text-right">
          {dayjs(createdAt).format("MM-DD-YYYY")}
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
