import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatSelection from "./components/ChatSelection";
import PublicChat from "./components/PublicChat";
import PrivateChat from "./components/PrivateChat";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000"); // Your NestJS server URL

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    socket.on("username", (username) => setUsername(username));
  }, []);
  return (
    <Router>
      <div className='flex flex-col h-screen font-sans bg-gray-100'>
        <header className='p-3 text-white bg-blue-600 shadow-md'>
          <h1 className='text-xl font-bold'>Chat Application</h1>
        </header>
        <main className='flex-grow p-4'>
          <Routes>
            <Route path='/' element={<ChatSelection username={username} />} />
            <Route
              path='/public'
              element={<PublicChat socket={socket} username={username} />}
            />
            <Route
              path='/private'
              element={<PrivateChat socket={socket} username={username} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
