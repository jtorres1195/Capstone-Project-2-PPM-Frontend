const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check is the user exists
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' })
        }

        // If the email and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', {
            expiresIn: '1h', //Token expiration time
        });
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;