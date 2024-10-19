const { db } = require("../database");

class Channel {
    constructor() { }

    async getAllChannels() {
        let query = `SELECT * FROM channels`;
        const params = [];
        const [results] = await db.execute(query, params);
        return results;
    }

    async createChannel({
        name,
        admin,
        pin,
    }) {
        const [results] = await db.execute(
            `INSERT INTO channels(channel_name, admin_id, pin) VALUES(?,?,?)`,
            [name, admin, pin]
        );
        
        await db.execute(
            `INSERT INTO enrolled_users_in_channel(channel_id,user_id) VALUES(?,?)`,
            [results?.insertId, admin]
        );
        return results;
    }

    async checkIfChannelExists({
        channelId
    }) {
        const [results] = await db.execute(
            `SELECT * FROM channels WHERE id=?`,
            [channelId]
        );
        
        return results;
    }

    async isUserEnrolledInChannel({
        userId,
        channelId
    }) {
        const [results] = await db.execute(
            `SELECT * FROM enrolled_users_in_channel WHERE channel_id=? AND user_id=?`,
            [channelId, userId]
        );
        
        return results;
    }

    async enrollUser({
        userId,
        channelId
    }) {
        const [results] = await db.execute(
            `INSERT INTO enrolled_users_in_channel(channel_id, user_id) VALUES(?,?)`,
            [channelId, userId]
        );
        return results;
    }
}

module.exports = { Channel };
