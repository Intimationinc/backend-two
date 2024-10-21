const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5500;
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
  },
});
// SECRET_KEY
const users = new Map();

io.on("connection", (socket) => {
  console.log("socket connected.", socket.id);
  // socket.emit("welcome", `welcome to the server, ${socket.id}`);
  // socket.emit('connect', socket.id)
  socket.on("register", (name) => {
    users.set(name, socket.id);
    console.log(`${name} register with socket id: ${socket.id}`);
    // and save it to db
  });

  socket.on("join-room", ({ name, user }) => {
    console.log(user, " joined the ", name);
    socket.join(name);
    // socket.broadcast.to(room).emit(user, "joined the room");
  });

  // socket.broadcast.emit("welcome", `welcome to the server, ${socket.id}`);
  socket.on("sendMessage", ({ message, toUser, fromUser, type }) => {
    console.log(message, toUser, type, fromUser);
    const recipient = users.get(toUser);
    if (recipient) {
      console.log("ok");
      io.to(recipient).emit("receiveMessage", { fromUser, toUser, message });
    } else {
      io.to(toUser).emit("receiveMessage", { fromUser, toUser, message });
    }
    // io.to(user).emit("receive-message", message);
  });

  app.post("/private/:id", async (req, res) => {
    const user = req.params.id;
    const message = req.body;
    console.log(message, user);
    // then data send to database
  });

  app.post("/public/:room", async (req, res) => {
    const room = req.params.room;
    // const message = req.body
    console.log(room);
    //  data sent to database
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });
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
