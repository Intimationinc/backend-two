import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  List,
  ListItem,
  VStack,
  HStack,
  Divider,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

interface Message {
  channel: string;
  message: string;
  username?: string; // Include username in Message interface
}

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [publicMessages, setPublicMessages] = useState<Message[]>([]);
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [privateMessage, setPrivateMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
      // Send username immediately if authenticated
      if (authenticated) {
        newSocket.send(JSON.stringify({ channel: "private", username }));
      }
    };

    newSocket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      if (data.message) {
        if (data.channel === "public") {
          setPublicMessages((prev) => [...prev, data]);
        } else if (data.channel === "private") {
          setPrivateMessages((prev) => [...prev, data]);
        }
        queryClient.invalidateQueries(["messages"]); // Invalidate messages query
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
  }, [authenticated, username, queryClient]);

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
    const msg: Message = { channel, message, username }; // Include username in the message
    sendMessage.mutate(msg);
  };

  const handleAuthentication = async () => {
    try {
      const response = await axios.post("http://localhost:5000/authenticate", {
        username,
      });
      if (response.status === 200) {
        setAuthenticated(true);
        setAuthError(null);
        // Join the private channel after authentication
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ channel: "private", username }));
        }
      }
    } catch (error) {
      setAuthError("Failed to authenticate. Please check your username.");
    }
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        WebSocket Chat
      </Heading>

      <Box>
        {/* Public Chat Section */}
        <Box bg="white" borderRadius="md" boxShadow="sm" p={4} mb={4}>
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Public Chat
          </Text>
          <Divider mb={3} />
          <List spacing={3} maxHeight="200px" overflowY="auto" mb={4}>
            {publicMessages.map((msg, index) => (
              <ListItem key={index}>
                <Text fontWeight="bold">{`${msg.channel}: ${msg.username}`}</Text>
                <Text>{msg.message}</Text>
              </ListItem>
            ))}
          </List>
          <FormControl>
            <HStack>
              <Input
                placeholder="Enter public message"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const input = e.currentTarget;
                    const messageContent = input.value;
                    handleSendMessage("public", messageContent);
                    input.value = ""; // Clear input
                  }
                }}
              />
              <Button
                onClick={() => {
                  handleSendMessage("public", privateMessage);
                  setPrivateMessage(""); // Clear input after sending
                }}
              >
                Send
              </Button>
            </HStack>
          </FormControl>
        </Box>

        {/* Private Chat Section */}
        <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Private Chat
          </Text>
          <Divider mb={3} />
          <FormControl mb={4}>
            <Input
              placeholder="Username for private chat"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isDisabled={authenticated}
            />
            {!authenticated && (
              <Button onClick={handleAuthentication} mt={2}>
                Authenticate
              </Button>
            )}
          </FormControl>

          {authError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {authError}
            </Alert>
          )}

          <List spacing={3} maxHeight="200px" overflowY="auto" mb={4}>
            {privateMessages.map((msg, index) => (
              <ListItem key={index}>
                <Text fontWeight="bold">{`${msg.channel}: ${msg.username}`}</Text>
                <Text>{msg.message}</Text>
              </ListItem>
            ))}
          </List>

          {authenticated && (
            <FormControl>
              <HStack>
                <Input
                  placeholder="Enter private message"
                  value={privateMessage}
                  onChange={(e) => setPrivateMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage("private", privateMessage);
                      setPrivateMessage(""); // Clear input
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    handleSendMessage("private", privateMessage);
                    setPrivateMessage(""); // Clear input after sending
                  }}
                >
                  Send
                </Button>
              </HStack>
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WebSocketComponent;
