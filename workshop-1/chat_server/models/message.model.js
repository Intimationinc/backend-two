const { db } = require("../database");

class Message {
    constructor() { }

    async getAllMessages({ receiverId, channelId }) {
        let query = `SELECT messages.*, users.username as sender_name FROM messages inner join users on users.id = messages.sender_id`;
        const params = [];
        if(receiverId){
            query += ` WHERE receiver_id=?`;
            params.push(receiverId)
        }
        if(channelId){
            query += ` WHERE channel_id=?`;
            params.push(channelId)
        }
        else{
            query += ` WHERE channel_id IS null`;
        }
        query += ` ORDER BY messages.created_at asc`
        const [results] = await db.execute(query, params);
        return results;
    }

    async sendMessage({
        senderId,
        receiverId,
        channelId,
        message,
    }) {
        console.log("senderId",senderId);
        console.log("receiverId",receiverId);
        console.log("channelId",channelId);
        console.log("message",message);
        
        if(receiverId){
            const [results] = await db.execute(
                `INSERT INTO messages(sender_id, receiver_id, message) VALUES(?,?,?)`,
                [senderId, receiverId, message]
            );
            return results;
        }
        else if(channelId){
            const [results] = await db.execute(
                `INSERT INTO messages(sender_id, channel_id, message) VALUES(?,?,?)`,
                [senderId, channelId, message]
            );
            return results;
        }
        else{
            const [results] = await db.execute(
                `INSERT INTO messages(sender_id, message) VALUES(?,?)`,
                [senderId, message]
            );
            return results;

        }
    }
}

module.exports = { Message };
