const { db } = require("../database");

class Message {
    constructor() { }

    async getAllMessages({ receiverId }) {
        let query = `SELECT messages.*, users.username as sender_name FROM messages inner join users on users.id = messages.sender_id`;
        const params = [];
        if(receiverId){
            query += ` WHERE receiver_id=?`;
            params.push(receiverId)
        }

        const [results] = await db.execute(query, params);
        return results;
    }

    async sendMessage({
        senderId,
        receiverId,
        message,
    }) {
        if(receiverId){
            const [results] = await db.execute(
                `INSERT INTO messages(sender_id, receiver_id, message, is_private) VALUES(?,?,?,?)`,
                [senderId, receiverId, message, true]
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
