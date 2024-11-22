const { io } = require("socket.io-client");

const socket = io('ws://localhost:3001');


export default socket;