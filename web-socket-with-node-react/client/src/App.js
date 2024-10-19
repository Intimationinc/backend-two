import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css'; // Tailwind CSS styles

const socket = io('http://localhost:3000');

const App = () => {
  const [username, setUsername] = useState(''); // Username state
  const [isUsernameSet, setIsUsernameSet] = useState(false); // Track if username is set
  const [publicMessage, setPublicMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [privateRoom, setPrivateRoom] = useState(''); // Private room entered by user
  const [isPrivateRoomSet, setIsPrivateRoomSet] = useState(false); // Track if the private room is set
  const [currentRoom, setCurrentRoom] = useState('public'); // Room name

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
    setIsPrivateRoomSet(true); // Private room is set after joining
  };

  // Send message to public chat
  const sendPublicMessage = () => {
    const messageData = { username, message: publicMessage };
    socket.emit('public-message', messageData); // Emit the message to the server
    setPublicMessage(''); // Clear the input field after sending
  };

  // Send message to private chat
  const sendPrivateMessage = () => {
    const messageData = { username, message: privateMessage };
    socket.emit('private-message', { room: privateRoom, message: messageData });
    setPrivateMessage(''); // Clear the input field after sending
  };

  // Function to render messages
  const renderMessages = (type) => {
    return messages
      .filter((msg) => msg.type === type)
      .map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-3 rounded-lg max-w-xs break-words ${
            msg.username === username
              ? 'bg-green-500 text-white self-end ml-auto' // Your message (green, right-aligned)
              : 'bg-blue-500 text-white self-start mr-auto'  // Others' messages (blue, left-aligned)
          }`}
        >
          <span className="block text-xs text-gray-200">{msg.username}</span>
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
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        {!isUsernameSet ? (
          // Ask for username
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Enter Your Username</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
              className="border p-2 rounded-lg w-full mb-4"
            />
            <button
              onClick={handleSetUsername}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        ) : (
          // Chat interface after setting username
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Public and Private Chat</h1>
            <div className="flex gap-4">
              
              {/* Public Chat Section */}
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-center">Public Chat</h2>
                <div className="border rounded-lg h-64 overflow-y-auto p-4 bg-gray-50 flex flex-col">
                  {renderMessages('public')}
                </div>
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={publicMessage}
                    onChange={(e) => setPublicMessage(e.target.value)}
                    placeholder="Type a public message"
                    className="border p-2 rounded-lg flex-grow"
                  />
                  <button
                    onClick={sendPublicMessage}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg"
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
                      className="border p-2 rounded-lg w-full mb-4"
                    />
                    <button
                      onClick={joinPrivateRoom}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Join Private Chat Room
                    </button>
                  </div>
                ) : (
                  // Private chat section after joining room
                  <>
                    <div className="border rounded-lg h-64 overflow-y-auto p-4 bg-gray-50 flex flex-col">
                      {renderMessages('private')}
                    </div>
                    <div className="flex mt-4">
                      <input
                        type="text"
                        value={privateMessage}
                        onChange={(e) => setPrivateMessage(e.target.value)}
                        placeholder="Type a private message"
                        className="border p-2 rounded-lg flex-grow"
                      />
                      <button
                        onClick={sendPrivateMessage}
                        className="bg-green-500 text-white px-4 py-2 ml-2 rounded-lg"
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
