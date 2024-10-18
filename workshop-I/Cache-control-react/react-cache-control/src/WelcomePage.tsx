import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  Alert,
  AlertIcon,
  FormControl,
} from "@chakra-ui/react";
import WebSocketComponent from "./WebSocketComponent";
import axios from "axios";

// Function to generate a random username
const generateRandomUsername = () => {
  const randomName = `User${Math.floor(Math.random() * 1000)}`;
  return randomName;
};

const WelcomePage: React.FC = () => {
  const [chatType, setChatType] = useState<"public" | "private" | null>(null);
  const [username, setUsername] = useState<string>(""); // Store username input
  const [authenticated, setAuthenticated] = useState(false); // Track if the user is authenticated
  const [authError, setAuthError] = useState<string | null>(null); // Store authentication error

  const handleJoinPublicChat = () => {
    // Check if username is empty and assign a random one
    const nameToUse =
      username.trim() === "" ? generateRandomUsername() : username;
    setUsername(nameToUse); // Set the username to use
    setChatType("public");
  };

  const handleJoinPrivateChat = () => {
    setChatType("private");
  };

  // Function to handle authentication
  const handleAuthentication = async () => {
    try {
      // Simulate authentication by calling an API
      const response = await axios.post("http://localhost:5000/authenticate", {
        username,
      });
      if (response.status === 200) {
        setAuthenticated(true); // Set authenticated to true on success
        setAuthError(null); // Clear any previous error
      }
    } catch (error) {
      setAuthError("Failed to authenticate. Please check your username.");
    }
  };

  // If chatType is selected and user is authenticated, render WebSocketComponent
  if (chatType === "public" || (chatType === "private" && authenticated)) {
    return <WebSocketComponent chatType={chatType} username={username} />;
  }

  // Show authentication form if user selected private chat but not yet authenticated
  if (chatType === "private" && !authenticated) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.900"
        color="white"
        textAlign="center"
        p={5}
      >
        <Heading as="h1" size="xl" mb={4}>
          Private Chat Authentication
        </Heading>
        <Text fontSize="lg" mb={8}>
          Please enter your username to authenticate.
        </Text>
        <VStack spacing={4}>
          <FormControl>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Button size="lg" colorScheme="blue" onClick={handleAuthentication}>
            Authenticate
          </Button>
        </VStack>
        {authError && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {authError}
          </Alert>
        )}
      </Box>
    );
  }

  // Initial welcome page
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.900"
      color="white"
      textAlign="center"
      p={5}
    >
      <Heading as="h1" size="2xl" mb={4}>
        Zaman's Chat!
      </Heading>
      <Text fontSize="xl" mb={8}>
        Welcome to our chat system! Join the public or private chat and start
        communicating.
      </Text>
      <VStack spacing={4}>
        <Button size="lg" colorScheme="teal" onClick={handleJoinPublicChat}>
          Join Public Chat
        </Button>
        <Button size="lg" colorScheme="blue" onClick={handleJoinPrivateChat}>
          Join Private Chat
        </Button>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
