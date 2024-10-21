import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

type PRIVATE_MESSAGE = {
  room: string;
  username: string;
  text: string;
  timestamp: string;
  id: string;
};

interface PrivateChatProps {
  socket: Socket;
  username: string;
}

const PrivateChat: React.FC<PrivateChatProps> = ({ socket, username }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<string>("");
  const [roomMessages, setRoomMessages] = useState<PRIVATE_MESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("private-message", (data: PRIVATE_MESSAGE) => {
      if (data.room === joinedRoom) {
        setRoomMessages((prev) => [...prev, data]);
      }
    });

    socket.on("joined-room", (joinedRoom) => setJoinedRoom(joinedRoom));

    return () => {
      socket.off("private-message");
      socket.off("joined-room");
    };
  }, [joinedRoom, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room);
      setRoomMessages([]);
    }
  };

  const sendRoomMessage = () => {
    if (message.trim() && room) {
      socket.emit("private-message", { room, message });
      setMessage("");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-md shadow-md'>
      <div className='flex justify-between items-center p-3 font-bold text-white bg-green-600'>
        <span>
          Private Chat <span className='text-sm font-thin'>({username})</span>
        </span>
        <button
          onClick={handleBack}
          className='px-3 py-1 text-sm text-green-600 bg-white rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-white'
        >
          Back to Home
        </button>
      </div>
      {joinedRoom ? (
        <div>
          <p className='p-2 font-semibold text-center'>
            Welcome to <span className='text-green-500'>{joinedRoom}</span>
          </p>
        </div>
      ) : (
        <div className='flex p-3'>
          <input
            type='text'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            placeholder='Enter room ID'
            className='px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <button
            onClick={joinRoom}
            className='px-2 py-1 mx-4 w-40 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Join Room
          </button>
        </div>
      )}
      <div className='flex flex-col flex-grow'>
        <div className='overflow-y-auto flex-grow p-4 space-y-2'>
          {roomMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.username === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-md shadow-sm max-w-xs ${
                  msg.username === username
                    ? "bg-green-500 text-white"
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
              onKeyDown={(e) => e.key === "Enter" && sendRoomMessage()}
              placeholder='Type a message...'
              className='flex-grow px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500'
              disabled={!joinedRoom}
            />
            <button
              onClick={sendRoomMessage}
              className='px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
              disabled={!joinedRoom}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
