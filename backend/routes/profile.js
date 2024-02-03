const express = require('express');
const { authenticateToken } = require('../middleware/authentication');
const User = require('../models/User');

const router = express.Router();

// Protected route requiring authentication
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Access the autheticated user information using req.user
        const userId = req.user.userId;

        // Retrieve user profile information from the database
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user profile data
        res.json({ message: 'User Profile', profile: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;