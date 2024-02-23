const express = require('express');
const { authenticateToken } = require('../middleware/auth');
constUser = require('../models/User');
const router = express.Router();

// Retrieve user's favorite pets
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        // Retrieve user's favorite pets from the database
        const favoritePets = await User.findFavoritePets(userId);
        res.json({ message: 'Favorite Pets', favorites: favoritePets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;