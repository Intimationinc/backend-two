import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import moment from "moment";

const socket: Socket = io("http://localhost:3000"); // Your NestJS server URL

type PUBLIC_MESSAGE = {
  username: string;
  text: string;
  timestamp: string;
  id: string;
};

const App: React.FC = () => {
  const [publicMessages, setPublicMessages] = useState<PUBLIC_MESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // listen public-message
    socket.on(
      "public-message",
      (data: {
        username: string;
        text: string;
        timestamp: string;
        id: string;
      }) => {
        setPublicMessages((prev) => [...prev, data]);
      }
    );

    // listen username
    socket.on("username", (username) => setUsername(username));

    return () => {
      socket.off("public-message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [publicMessages]);

  const sendPublicMessage = () => {
    if (message.trim()) {
      socket.emit("public-message", message);
      setMessage("");
    }
  };

  return (
    <div className='flex flex-col h-screen font-sans bg-gray-100'>
      <header className='flex justify-between items-center p-3 text-white bg-blue-600 shadow-md'>
        <h1 className='text-xl font-bold'>Public Chat Room</h1>
        <p className='font-normal text-md'>{username}</p>
      </header>
      <main className='overflow-hidden flex-grow p-2'>
        <div className='flex flex-col h-full bg-white rounded-md shadow-md min-h-[400px] min-w-[300px]'>
          <div className='overflow-y-auto flex-grow p-4 space-y-2'>
            {publicMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.username === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-md shadow-sm min-w-52 ${
                    msg.username === username
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div className='font-semibold'>
                    {msg.username === username ? "You" : msg.username}
                  </div>
                  <div className='mt-1'>{msg.text}</div>
                  <div
                    className={`mt-2 text-xs ${
                      msg.username === username
                        ? " text-gray-100"
                        : " text-gray-500"
                    }`}
                  >
                    {moment(msg.timestamp).format("h:mm:ss A")}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='p-4 border-t'>
            <div className='flex space-x-2'>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendPublicMessage()}
                placeholder='Type a message...'
                className='flex-grow px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                onClick={sendPublicMessage}
                className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
