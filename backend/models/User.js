const db = require('./db');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static async checkIfUserExists(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows.length > 0;
    }

    static async createUser(usernam, email, hashedPassword) {
        const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';
        await db.query(query, [username, email, hashedPassword]);
    }
}

module.exports = User;