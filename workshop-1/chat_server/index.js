const express = require("express");
const { db } = require("./database");
const userRouter = require("./routes/user.routes");
const verifyToken = require("./middlewares/auth");
const messageRouter = require("./routes/message.routes");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors())

app.use("/user", userRouter);
app.use("/message", verifyToken, messageRouter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

io.on("connection", (socket) => {
    console.log("socketId",socket.id);
});

httpServer.listen(process.env.PORT, async () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
    try {
        await db.getConnection();
        console.log(`Connection to database has been established successfully.`);
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
});



