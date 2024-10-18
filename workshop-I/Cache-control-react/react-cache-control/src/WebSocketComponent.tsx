import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  List,
  ListItem,
  HStack,
  FormControl,
} from "@chakra-ui/react";

interface Message {
  channel: string;
  message: string;
  username?: string; // Include username in Message interface
}

interface WebSocketComponentProps {
  chatType: "public" | "private";
  username: string; // Accept username as a prop
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({
  chatType,
  username,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
      if (chatType === "private") {
        newSocket.send(JSON.stringify({ channel: "private", username }));
      }
    };

    newSocket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);

      // Check if the message channel matches the chat type
      if (data.message && data.channel === chatType) {
        setMessages((prev) => [...prev, data]);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      newSocket.close();
    };
  }, [chatType, username]);

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          channel: chatType,
          message: messageContent,
          username,
        })
      );
      setMessageContent(""); // Clear input after sending
    }
  };

  return (
    <Box
      p={4}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      maxWidth="400px" // Set max width for chat box
      height="80vh" // Set a fixed height
      display="flex"
      flexDirection="column"
      position="fixed" // Change to fixed to stay visible
      left="50%" // Center horizontally
      top="50%" // Center vertically
      transform="translate(-50%, -50%)" // Adjust position
    >
      <Heading as="h2" size="lg" mb={4} color="white">
        {chatType === "public" ? "Public" : "Private"} Chat
      </Heading>
      <Text color="white">{username}</Text>
      <Box
        flex="1" // Allow this area to take remaining space
        overflowY="auto" // Make messages scrollable
        mb={4}
        p={2} // Add padding
        bg="gray.700" // Background color for messages
        borderRadius="md" // Rounded corners for message area
      >
        <List spacing={3}>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold" color="cyan.400">
                {`${msg.channel}: ${msg.username || "Anonymous"}`}
              </Text>
              <Text color="white">{msg.message}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <FormControl>
        <HStack>
          <Input
            placeholder={`Enter ${chatType} message`}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            bg="gray.600" // Input background color
            color="white" // Input text color
            borderColor="gray.500" // Input border color
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default WebSocketComponent;
