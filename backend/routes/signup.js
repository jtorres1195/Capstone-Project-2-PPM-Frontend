const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check is the user already exists
        const existingUser = await db.query(queryCheckUser, [email]);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exixts' });
        }

        //Hash the passwword
        const hashedPassword = await bcrypt.hash(password, 20);

        //Create a new user instance
        const newUser = new User(username, email, hashedPassword);

        // Save the user to the database
        await newUser.createUser();

        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;