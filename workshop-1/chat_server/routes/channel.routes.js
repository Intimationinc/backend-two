const express = require('express');
const { createChannel, getAllChannels, enrollInChannel, isUserEnrolledInChannel } = require('../controllers/channel.controller');

const channelRouter = express.Router();

channelRouter.get('/all',getAllChannels);
channelRouter.post('/create',createChannel);
channelRouter.get('/isenrolled',isUserEnrolledInChannel);
channelRouter.post('/enroll',enrollInChannel);


module.exports = channelRouter