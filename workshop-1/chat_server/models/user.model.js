const { db } = require("../database");
const bcrypt = require("bcryptjs");

class User{
    constructor(){

    }

    async getUserById(userId){
        const [results] = await db.execute(`SELECT * FROM users where id=?`,[userId]);        
        return results[0];
    }

    async getUserByEmail(email){
        const [results] = await db.execute(`SELECT * FROM users where email=?`,[email]);        
        return results[0];
    }

    async createUser({username, password, email}){
        const [results] = await db.execute(`INSERT INTO users(username, email, password) values(?,?,?)`,[username, email, await bcrypt.hash(password, 10)]);
        return results[0];
    }

    async login({token, expirationTimestamp, userId}){
        const [results] = await db.execute(`UPDATE users SET token=?, token_expiration_time=? where id=?`,[token, expirationTimestamp, userId]);
        return results[0];
    }
}

module.exports = {User}