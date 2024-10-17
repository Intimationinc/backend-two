const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5500;
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket connected.");
  console.log("ID: ", socket.id);
});

app.get("/", async (req, res) => {
  res.send("Hey I am Rahi.");
});

app.listen(port, () => {
  console.log(`server is running: ${port}`);
});
