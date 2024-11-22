const { Message } = require("../models/message.model");
const { getErrorResponse, getSuccessResponse } = require("../utils/responseHandlers");

module.exports = {
    getAllMessages: async (request, response) => {
        try {
            const currentUser = request.user;
            
            const {receiverId, channelId} = request.query;
            const message = new Message();

            const messages = await message.getAllMessages({ receiverId: receiverId ? String(receiverId) : null, channelId: channelId ? String(channelId) : null});

            return getSuccessResponse({
                response,
                code: 200,
                message: 'Messages fetched successfully.',
                data: messages
            });

        } catch (err) {
            console.log("error", err.message);
            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },

    sendMessage: async (request, response) => {
        try {
            const currentUser = request.user;
            const { message,receiverId, channelId} = request.body;

            if (!message) return getErrorResponse({ response, code: 400, message: "Missing required parameters" });

            const messageObj = new Message();

            // create the message
            await messageObj.sendMessage({ senderId: currentUser.id, message, receiverId, channelId });

            return getSuccessResponse({
                response,
                code: 201,
                message: `Message sent successfully`,
                data: null
            });

        } catch (err) {
            console.log("error", err.message);
            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },
};