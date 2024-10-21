import React from "react";
import { Link } from "react-router-dom";

const ChatSelection: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='p-32 bg-white rounded-lg shadow-md'>
        <h2 className='mb-6 text-2xl font-bold text-center'>
          Welcome to the Chat App,{" "}
          <span className='text-blue-600'>{username}</span>!
        </h2>
        <h3 className='mb-6 text-xl text-center'>Select Chat Type</h3>
        <div className='space-y-4'>
          <Link
            to='/public'
            className='block px-4 py-2 w-full text-center text-white bg-blue-500 rounded transition duration-300 hover:bg-blue-600'
          >
            Public Chat
          </Link>
          <Link
            to='/private'
            className='block px-4 py-2 w-full text-center text-white bg-green-500 rounded transition duration-300 hover:bg-green-600'
          >
            Private Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSelection;
