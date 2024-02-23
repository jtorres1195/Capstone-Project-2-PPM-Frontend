const db = require('./db');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Method to check iof a user already exists
    static async checkIfUserExists(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows.length > 0;
    }

    // Method to create a user
    static async createUser(username, email, hashedPassword) {
        const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';
        await db.query(query, [username, email, hashedPassword]);
    }

    // Method to find favorite pets for a user
    static async findFavoritePets(userId) {
        try {
            const query = ' SELECT * FROM favorite_pets WHERE user_id = $1';
            const result = await db.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Error finding favorite pets:', error);
            throw error;
        }
    }

    // Method to find saved pets for a user
    static async findSavedPets(userId) {
        try {
            const query = ' SELECT * FROM saved_pets WHERE user_id = $1';
            const result = await db.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Error finding saved pets:', error);
            throw error;
        }
    }
}

module.exports = User;