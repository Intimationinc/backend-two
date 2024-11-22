import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css'; 

const socket = io('http://localhost:3000');

const App = () => {
  const [username, setUsername] = useState(''); 
  const [isUsernameSet, setIsUsernameSet] = useState(false); 
  const [publicMessage, setPublicMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [privateRoom, setPrivateRoom] = useState(''); 
  const [isPrivateRoomSet, setIsPrivateRoomSet] = useState(false); 
  const [currentRoom, setCurrentRoom] = useState('public'); 

  useEffect(() => {
    // Listen for public messages
    socket.on('public-message', (data) => {
      setMessages((prev) => [...prev, { type: 'public', ...data }]);
    });

    // Listen for private messages
    socket.on('private-message', (data) => {
      if (data.room === privateRoom) {
        setMessages((prev) => [...prev, { type: 'private', ...data.message }]);
      }
    });

    return () => {
      socket.off('public-message');
      socket.off('private-message');
    };
  }, [privateRoom]);

  // Join private room
  const joinPrivateRoom = () => {
    socket.emit('join-private', privateRoom);
    setCurrentRoom(privateRoom);
    setIsPrivateRoomSet(true); 
  };

  // Send message to public chat
  const sendPublicMessage = () => {
    const messageData = { username, message: publicMessage };
    socket.emit('public-message', messageData); 
    setPublicMessage('');
  };

  // Send message to private chat
  const sendPrivateMessage = () => {
    const messageData = { username, message: privateMessage };
    socket.emit('private-message', { room: privateRoom, message: messageData });
    setPrivateMessage('');
  };

  // Function to render messages
  const renderMessages = (type) => {
    return messages
      .filter((msg) => msg.type === type)
      .map((msg, index) => (
        <div
          key={index}
          className={`mb-2 px-4 py-1 max-w-xs break-words ${
            msg.username === username
              ? 'bg-gray-100 text-black self-end ml-auto rounded-bl-lg rounded-tl-lg rounded-tr-lg' 
              : 'bg-pink-100 text-black self-start mr-auto rounded-tl-lg rounded-tr-lg rounded-br-lg' 
          }`}
        >
          <span className="block text-xs text-pink-600 font-medium">username: {msg.username}</span>
          <span>{msg.message}</span>
        </div>
      ));
  };

  // Set username and proceed to chat
  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-10">
        {!isUsernameSet ? (
          <div>
            <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">Please Login!</h1>
            
            <div className='mx-auto space-y-6 w-full max-w-lg'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your username"
              className="border px-4 py-2 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-pink-500 text-gray-600" 
            />


            <button
              onClick={handleSetUsername}
              className="w-full bg-pink-500 hover:bg-pink-700 duration-300 ease-in-out text-white px-10 py-2 rounded-2xl"
            >
              Login
            </button>
            </div>
          </div>
        ) : (

          // Chat interface after setting username

          <>
            <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">Public and Private Chat</h1>
            <div className="flex gap-4">
              
              {/* Public Chat Section */}
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-center">Public Chat</h2>
                <div className="border rounded-lg h-64 overflow-y-auto p-4 flex flex-col">
                  {renderMessages('public')}
                </div>
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={publicMessage}
                    onChange={(e) => setPublicMessage(e.target.value)}
                    placeholder="Type a public message"
                    className="border focus:outline-none focus:ring-1 focus:ring-pink-500 p-2 rounded-lg flex-grow"
                  />
                  <button
                    onClick={sendPublicMessage}
                    className="bg-pink-500 hover:bg-pink-700 duration-300 ease-in-out text-white px-8 py-2 ml-2 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Private Chat Section */}
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-center">Private Chat</h2>
                
                {!isPrivateRoomSet ? (
                  // Prompt to enter private room ID
                  <div className="text-center">
                    <input
                      type="text"
                      value={privateRoom}
                      onChange={(e) => setPrivateRoom(e.target.value)}
                      placeholder="Enter Private Room ID"
                      className="border focus:outline-none focus:ring-1 focus:ring-pink-500 p-2 rounded-lg w-full mb-4"
                    />

                    <button
                      onClick={joinPrivateRoom}
                      className="bg-pink-500 hover:bg-pink-700 duration-300 ease-in-out text-white px-4 py-2 rounded-lg"
                    >
                      Join Private Chat Room
                    </button>
                  </div>
                ) : (

                  // Private chat section after joining room
                  <>
                    <div className="border rounded-lg h-64 overflow-y-auto p-4 flex flex-col">
                      {renderMessages('private')}
                    </div>

                    <div className="flex mt-4">
                      <input
                        type="text"
                        value={privateMessage}
                        onChange={(e) => setPrivateMessage(e.target.value)}
                        placeholder="Type a private message"
                        className="border focus:outline-none focus:ring-1 focus:ring-pink-500 p-2 rounded-lg flex-grow"
                      />
                      
                      <button
                        onClick={sendPrivateMessage}
                        className="bg-pink-500 hover:bg-pink-700 duration-300 ease-in-out text-white px-8 py-2 ml-2 rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
