import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for testing
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle public messages
  socket.on('public-message', (data) => {
    io.emit('public-message', data); // Broadcast to all clients
  });

  // Handle joining a private room
  socket.on('join-private', (room) => {
    socket.join(room); // Add the socket to the room
    console.log(`${socket.id} joined private room: ${room}`);
  });

  // Handle private messages for the specific room
  socket.on('private-message', ({ room, message }) => {
    io.to(room).emit('private-message', { room, message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
