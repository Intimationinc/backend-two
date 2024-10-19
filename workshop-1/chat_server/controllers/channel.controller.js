const { Channel } = require("../models/channel.model");
const { getErrorResponse, getSuccessResponse } = require("../utils/responseHandlers");

module.exports = {
    getAllChannels: async (request, response) => {
        try {
            const channel = new Channel();

            const channels = await channel.getAllChannels();

            return getSuccessResponse({
                response,
                code: 200,
                message: 'Channels fetched successfully.',
                data: channels
            });

        } catch (err) {
            console.log("error", err);
            return getErrorResponse({ response, code: 500, channel: "Something went wrong!" });
        }
    },

    createChannel: async (request, response) => {
        try {
            const currentUser = request.user;
            const { name, admin, pin } = request.body;

            if (!name || !admin || !pin) return getErrorResponse({ response, code: 400, channel: "Missing required parameters" });

            const channelObj = new Channel();

            // create the channel
            const channel = await channelObj.createChannel({ name, admin, pin });
            
            return getSuccessResponse({
                response,
                code: 201,
                message: `Channel created successfully`,
                data: {
                    channelId: channel?.insertId
                }
            });

        } catch (err) {
            console.log("error", err);
            return getErrorResponse({ response, code: 500, channel: "Something went wrong!" });
        }
    },



    isUserEnrolledInChannel: async (request, response) => {
        try {
            const currentUser = request.user;
            const { channelId } = request.query;

            if (!channelId) return getErrorResponse({ response, code: 400, message: "Missing required parameters" });

            const channelObj = new Channel();

            const channel = await channelObj.checkIfChannelExists({ channelId });
            if (channel[0]) {
                // check if user is enrolled in channel
                const row = await channelObj.isUserEnrolledInChannel({ userId: currentUser.id, channelId });

                return getSuccessResponse({
                    response,
                    code: 201,
                    message: `Enrollment data fetched successfully`,
                    data: {
                        isEnrolled: row.length > 0
                    }
                });
            }

        } catch (err) {
            console.log("error", err.message);
            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },


    enrollInChannel: async (request, response) => {
        try {
            const currentUser = request.user;
            const { pin, channelId } = request.body;

            if (!pin || !channelId) return getErrorResponse({ response, code: 400, message: "Missing required parameters" });

            const channelObj = new Channel();

            const channel = await channelObj.checkIfChannelExists({ channelId });
            if (channel[0]?.pin === parseInt(pin)) {
                // add user in channel
                await channelObj.enrollUser({ userId: currentUser.id, channelId, pin });

                return getSuccessResponse({
                    response,
                    code: 201,
                    message: `User enrolled in channel successfully`,
                    data: {isEnrolled: true}
                });
            }
            else{
                return getErrorResponse({ response, code: 403, message: "Invalid pin code" });
            }

        } catch (err) {
            console.log("error", err.message);
            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },
};