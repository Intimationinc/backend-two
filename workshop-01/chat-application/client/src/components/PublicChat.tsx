import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

type PUBLIC_MESSAGE = {
  username: string;
  text: string;
  timestamp: string;
  id: string;
};
interface PublicChatProps {
  socket: Socket;
  username: string;
}

const PublicChat: React.FC<PublicChatProps> = ({ socket, username }) => {
  const navigate = useNavigate();
  const [publicMessages, setPublicMessages] = useState<PUBLIC_MESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");

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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-md shadow-md'>
      <div className='flex justify-between items-center p-3 font-bold text-white bg-blue-600'>
        <span>
          Public Chat Room{" "}
          <span className='text-sm font-thin'>({username})</span>
        </span>
        <button
          onClick={handleBack}
          className='px-3 py-1 text-sm text-blue-600 bg-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white'
        >
          Back to Home
        </button>
      </div>
      <div className='overflow-y-auto flex-grow p-4 space-y-2'>
        {publicMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.username === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-md shadow-sm max-w-xs ${
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
                className={`mt-2 text-xs text-gray-500 ${
                  msg.username === username ? " text-white" : "text-gray-500"
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
  );
};

export default PublicChat;
