const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check is the user already exists
        const existingUser = await User.checkIfUserExists(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Hash the passwword
        const hashedPassword = await bcrypt.hash(password, 20);

        // Create new user instance
        await User.createUser(username, email, hashedPassword);
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;