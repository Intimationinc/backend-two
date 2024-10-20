import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
const socketContext = createContext(null);

export const useSocket = () => {
    return useContext(socketContext)
}

export const Socket = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:5500"), []);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};


