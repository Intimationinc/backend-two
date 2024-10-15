import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  channel: string;
  message: string;
}

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8765");
    setSocket(newSocket);

    newSocket.onopen = () => {
      // Join the public channel
      newSocket.send(JSON.stringify({ channel: "public" }));
      console.log("WebSocket connection established.");
    };

    newSocket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      if (data.message) {
        setMessages((prev) => [...prev, data]);
        queryClient.invalidateQueries(["messages"]); // Invalidate messages query
      }
    };

    return () => {
      newSocket.close();
    };
  }, [queryClient]);

  const sendMessage = useMutation(
    (message: Message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    {
      onSuccess: () => {
        console.log("Message sent successfully");
      },
      onError: (error) => {
        console.error("Error sending message:", error);
      },
    }
  );

  const handleSendMessage = (channel: string, message: string) => {
    sendMessage.mutate({ channel, message });
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.channel}: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
      <h3>Send message:</h3>
      <input
        type="text"
        placeholder="Enter message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const input = e.currentTarget;
            const messageContent = input.value;
            handleSendMessage("public", messageContent); // Default to public
            input.value = "";
          }
        }}
      />
    </div>
  );
};

export default WebSocketComponent;
