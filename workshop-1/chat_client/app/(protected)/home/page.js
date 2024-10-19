"use client";

import React, { useState, useEffect } from "react";
import MessageCard from "@/app/components/messageCard";
import ProtectedRoute from "@/app/components/protectedRoute";
import UserCard from "@/app/components/userCard";
import useUserStore from "@/stores/useStore";
import axios from "axios";
import { BASE } from "@/app/utils/constant";
import dayjs from "dayjs";
import ChannelCard from "@/app/components/channelCard";
import socket from "@/app/utils/socket";

export default function Chat() {
  const user = useUserStore((state) => state.user);
  const channelCreated = useUserStore((state) => state.channelCreated);
  const setChannelCreated = useUserStore((state) => state.setChannelCreated);

  const [selectedUser, setSelectedUser] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [enrolledChannels, setEnrolledChannels] = useState([]);
  const [pinInput, setPinInput] = useState(""); // State for PIN input
  
  useEffect(()=>{
    socket.on("connect", () => {
      console.log("socketId",socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    
    socket.on("message", (data) => {   
      setMessages((prev)=>[...prev, data]);
    });
    
    socket.on("channel", (data) => {   
      setChannels((prev)=>[...prev, data]);
    });
    
    return () => {
      socket.off("message");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("channel");
    };
  },[]);

  const handleFetchChannels = async () => {
    try {      
      const response = await axios.get(`${BASE}/channel/all`, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        }
      });
  
      if (response.status === 200) {
        const channelsData = response.data.data || [];
        setChannels(channelsData);
      } else {
        console.error("Failed to fetch channels");
      }
    } catch (error) {
      console.error("Error while fetching channels:", error);
    }
  };

  const handleFetchMessages = async ({channelId, receiverId}) => {
    try {
      let queryString = "";
      queryString += receiverId ? `?receiverId=${receiverId}` : '';
      queryString += channelId ? `?channelId=${channelId}` : '';
      
      const response = await axios.get(`${BASE}/message/all${queryString}`, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        }
      });
  
      if (response.status === 200) {
        const messagesData = response.data.data || [];
        setMessages(messagesData);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error while fetching messages:", error);
    }
  };

  const checkIfUserIsEnrolledInChannel = async (channelId) => {
    if (!channelId) return;
    let queryString = "";
    queryString += channelId ? `?channelId=${channelId}` : '';
    try {
      const response = await axios.get(`${BASE}/channel/isenrolled${queryString}`, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        }
      });
  
      if (response.status === 201) {
        if (response?.data?.data?.isEnrolled) {
          setEnrolledChannels((prev) => [...prev, channelId]);
        }
      } else {
        console.error("Failed to check if enrolled");
      }
    } catch (error) {
      console.error("Error while checking if enrolled:", error);
    }
  };

  const handleSendMessage = async ({channelId, receiverId}) => {
    if (!messageInput || !user?.token) return;
  
    try {
      const response = await axios.post(`${BASE}/message/send`, {
        message: messageInput,
        receiverId: receiverId || null,
        channelId: channelId || null,
      }, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        }
      });
  
      if (response.status === 201) {
        socket.emit("message", { 
          message: messageInput, 
          sender_id: user.id, 
          sender_name: user.username, 
          receiver_id: selectedUser?.id || null, 
          createdAt: dayjs(), 
          channel_id: channelId
        });
        setMessageInput("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  const handleEnrollInChannel = async () => {
    if (!pinInput || !selectedChannel?.id) return;
    
    try {
      const response = await axios.post(`${BASE}/channel/enroll`, {
        channelId: selectedChannel?.id,
        pin: pinInput,
      }, {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        }
      });

      if (response.status === 201 && response?.data?.data?.isEnrolled) {
        setEnrolledChannels((prev) => [...prev, selectedChannel?.id]);
        setPinInput(""); // Clear the PIN input after successful enrollment
      } else {
        console.error("Failed to enroll in the channel");
      }
    } catch (error) {
      console.error("Error while enrolling in channel:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      handleFetchChannels();
    }
  }, [user?.token]);

  useEffect(() => {
    if (user?.token && channelCreated) {
      handleFetchChannels();
      setChannelCreated(false);
    }
  }, [user?.token, channelCreated]);

  useEffect(() => {
    if (selectedChannel?.id && !enrolledChannels.includes(selectedChannel?.id)) {
      checkIfUserIsEnrolledInChannel(selectedChannel?.id);
    }
    if (user?.token) {
      handleFetchMessages({ channelId: selectedChannel?.id, receiverId: selectedUser?.id });
    }
  }, [user?.token, selectedChannel, selectedUser, enrolledChannels]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <div className="!min-w-[300px] h-full p-4 overflow-y-auto bg-gray-100">
          <ChannelCard
            name={"World Chat"}
            onClick={() => {
              setSelectedChannel();
            }}
          />
          <h2 className="text-xl font-semibold my-4">Channels</h2>
          <div className="space-y-4">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                name={channel.channel_name}
                onClick={() => handleChannelClick(channel)}
              />
            ))}
          </div>
        </div>

        <div className="w-4/5 h-full flex flex-col p-4 bg-white relative">
          <h2 className="text-xl font-semibold mb-4">
            {selectedChannel && Object.keys(selectedChannel).length > 0
              ? `${selectedChannel?.channel_name}`
              : "World Chat"}
          </h2>

          <div className="flex-1 space-y-4 !max-h-[80vh] !overflow-y-auto mb-[120px]">
            {selectedChannel?.id && !enrolledChannels.includes(selectedChannel?.id) ? (
              <div>
                <p>You don't have access to this channel. Please enter the PIN to enroll:</p>
                <input
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md mt-2"
                  placeholder="Enter PIN"
                />
                <button
                  onClick={handleEnrollInChannel}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Enroll
                </button>
              </div>
            ) : messages && messages.map((message) => {
              
              return (selectedChannel?.id && message?.channel_id === selectedChannel?.id) || (!selectedChannel?.id && !message?.channel_id) ? <MessageCard
              key={message.id}
              senderId={message.sender_id}
              senderName={message.sender_name}
              message={message.message}
              createdAt={message.createdAt}
            /> : <></>
            })}
          </div>

          <div className="absolute bottom-20 w-[90%] flex items-center">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Type your message here..."
            />
            <button
              onClick={() => handleSendMessage({ channelId: selectedChannel?.id, receiverId: selectedUser?.id })}
              className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>

        <div className="!min-w-[300px] h-full p-4 overflow-y-auto bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-4">
            {/* Users list */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
