"use client";

import React, { useState, useEffect } from "react";
import MessageCard from "@/app/components/messageCard";
import ProtectedRoute from "@/app/components/protectedRoute";
import UserCard from "@/app/components/userCard";
import useUserStore from "@/stores/useStore";
import axios from "axios";
import { BASE } from "@/app/utils/constant";
import dayjs from "dayjs";

const { io } = require("socket.io-client");

const socket = io('ws://localhost:3001');

export default function Chat() {
  const user = useUserStore((state) => state.user); // Access the user data
  
  const [selectedUser, setSelectedUser] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Williams" },
  ];

  useEffect(()=>{
    socket.on("connect", () => {
      console.log("socketId",socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected"); // undefined
    });
    
    socket.on("message", (data) => {      
      setMessages((prev)=>[...prev, data])
      // someone sent a message
      // handleFetchMessages()
    });
    return () => {
      socket.off("message");
      socket.off("connect");
      socket.off("disconnect");
    };
  },[])

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleFetchMessages = async () => {
    try {
      const receiverId = selectedUser?.id || null;
      const queryString = receiverId ? `?receiverId=${receiverId}` : '';
      
      const response = await axios.get(`${BASE}/message/all${queryString}`, {
        headers: {
          "Authorization": `Bearer ${user?.token}`, // Sending Bearer token in headers
        }
      });
  
      if (response.status === 200) {
        const messages = response.data.data || [];
        setMessages(messages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error while fetching messages:", error);
    }
  };
  
  const handleSendMessage = async () => {
    if (!messageInput || !user?.token) return; // Don't send if the message input is empty
  
    try {
      const response = await axios.post(`${BASE}/message/send`, {
        message: messageInput,
        receiverId: selectedUser?.id || null, // Send to selected user if any
      }, {
        headers: {
          "Authorization": `Bearer ${user?.token}`, // Sending Bearer token in headers
        }
      });      
  
      if (response.status === 201) {
        socket.emit("message",{message: messageInput, sender_id: user.id, sender_name: user.username, receiver_id: selectedUser?.id || null, createdAt: dayjs()})
        setMessageInput(""); // Clear the message input after successful send
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };
  
  useEffect(()=>{
    if(user?.token)handleFetchMessages()
  },[user?.token])

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Left column: User list */}
        <div className="!min-w-[300px] h-full p-4 overflow-y-auto bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                onClick={() => {
                  handleUserClick(user);
                }}
              />
            ))}
          </div>
        </div>

        {/* Right column: Messages */}
        <div className="w-4/5 h-full flex flex-col p-4 bg-white relative">
          <h2 className="text-xl font-semibold mb-4">
            {selectedUser && Object.keys(selectedUser).length > 0
              ? `${selectedUser?.name}`
              : "World Chat"}
          </h2>

          {/* Scrollable Messages Area */}
          <div className="flex-1 space-y-4 !max-h-[80vh] !overflow-y-auto">
            {messages && messages.map((message) => (
              <MessageCard
                key={message.id}
                senderId={message.sender_id}
                senderName={message.sender_name}
                message={message.message}
                createdAt={message.createdAt}
              />
            ))}
          </div>

          {/* Input box fixed at the bottom */}
          <div className="absolute bottom-20 w-[90%] flex items-center">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
