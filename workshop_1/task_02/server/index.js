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
const user = new Map()

io.on("connection", (socket) => {
  console.log("socket connected.", socket.id);
  // socket.emit("welcome", `welcome to the server, ${socket.id}`);
  // socket.broadcast.emit("welcome", `welcome to the server, ${socket.id}`);
  socket.on("message", ({ message, user }) => {
    console.log(message, user);
    io.to(user).emit("receive-message", message);
  });

  socket.on("register", (name) => {
    user.set(name, socket.id)
    console.log(`${name} register with socket id: ${socket.id}`)
    // and save it to db
  })

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
