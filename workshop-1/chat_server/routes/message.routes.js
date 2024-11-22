const express = require('express');
const { getAllMessages, sendMessage } = require('../controllers/message.controller');

const messageRouter = express.Router();

messageRouter.get('/all',getAllMessages);
messageRouter.post('/send',sendMessage);

module.exports = messageRouter