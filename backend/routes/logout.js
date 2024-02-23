const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.post('/logout', authenticateToken, (_req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

