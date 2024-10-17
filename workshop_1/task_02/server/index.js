const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5500;
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected.", socket.id);
  // socket.emit("welcome", `welcome to the server, ${socket.id}`);
  // socket.broadcast.emit("welcome", `welcome to the server, ${socket.id}`);
  socket.on("message", ({message, room}) => {
    console.log(message, room)
    io.to(room).emit("receive-message", message)
  })
  socket.on("disconnect", () => {
    console.log("server disconnected.", socket.id);
  });
});

app.get("/", async (req, res) => {
  res.send("Hey I am Rahi.");
});

server.listen(port, () => {
  console.log(`server is running: ${port}`);
});
