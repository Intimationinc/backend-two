import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const socket: Socket = io("http://localhost:3000"); // Your NestJS server URL

type CHANNEL_MESSAGE = {
  channel: string;
  username: string;
  text: string;
  timestamp: string;
  id: string;
};

const PrivateChat: React.FC = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [channelMessages, setChannelMessages] = useState<CHANNEL_MESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [newChannelName, setNewChannelName] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("username", (username) => setUsername(username));
    socket.on("user-channels", (userChannels) => setChannels(userChannels));
    socket.on("channel-message", (data: CHANNEL_MESSAGE) => {
      if (data.channel === selectedChannel) {
        setChannelMessages((prev) => [...prev, data]);
      }
    });

    socket.emit("get-channels");

    return () => {
      socket.off("username");
      socket.off("user-channels");
      socket.off("channel-message");
    };
  }, [selectedChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages]);

  const joinChannel = (channelName: string) => {
    socket.emit("join-channel", channelName);
    setSelectedChannel(channelName);
    setChannelMessages([]);
  };

  const createAndJoinChannel = () => {
    if (newChannelName.trim()) {
      joinChannel(newChannelName);
      setNewChannelName("");
    }
  };

  const sendChannelMessage = () => {
    if (message.trim() && selectedChannel) {
      socket.emit("channel-message", { channel: selectedChannel, message });
      setMessage("");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-md shadow-md'>
      <div className='flex justify-between items-center p-3 font-bold text-white bg-green-600'>
        <span>Private Chat</span>
        <button
          onClick={handleBack}
          className='px-3 py-1 text-sm text-green-600 bg-white rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-white'
        >
          Back to Home
        </button>
      </div>
      <div className='flex flex-grow'>
        <div className='w-1/4 border-r'>
          <div className='p-3 font-bold text-white bg-green-500'>Channels</div>
          <div className='p-2'>
            <input
              type='text'
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder='New channel name'
              className='px-2 py-1 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <button
              onClick={createAndJoinChannel}
              className='px-2 py-1 mt-2 w-full text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Create & Join
            </button>
          </div>
          <ul className='p-2 space-y-1'>
            {channels.map((channel) => (
              <li
                key={channel}
                onClick={() => joinChannel(channel)}
                className={`cursor-pointer p-2 rounded-md ${
                  channel === selectedChannel
                    ? "bg-green-100 text-green-800"
                    : "hover:bg-gray-100"
                }`}
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col w-3/4'>
          <div className='p-3 font-bold text-white bg-green-500'>
            {selectedChannel || "Select a channel"}
          </div>
          <div className='overflow-y-auto flex-grow p-4 space-y-2'>
            {channelMessages.map((msg, idx) => (
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
                  <div className='mt-2 text-xs text-gray-500'>
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
                onKeyDown={(e) => e.key === "Enter" && sendChannelMessage()}
                placeholder='Type a message...'
                className='flex-grow px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500'
                disabled={!selectedChannel}
              />
              <button
                onClick={sendChannelMessage}
                className='px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                disabled={!selectedChannel}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
