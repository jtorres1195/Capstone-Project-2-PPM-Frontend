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

// Update user profile
router.put('/profile/:id/update', authenticateToken, async (req, res) => {
    try {
        // Access the authenticated user information using req.user
        const userId = req.user.userId;

        // Check if the requested profile update matches the authenticated user
        if (userId !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
        }

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data based on the request body
        const { username, email } = req.body;

        // Validate/update fields as needed
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }

        // Save the updated user to the database
        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal sercer error' });
    }
});

// Change user password
router.put('/profile/:id/change-password', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Check if the requested password change matches the authenticated user
        if (userId !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: You can only change your own password' });
        }

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate old and new passwords and update the password field
        const { oldPassword, newPassword } = req.body;
        
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Old Password' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password field with the new hashed password
        user.password = hashedNewPassword;

        // Save the updated user to the database
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete user profile
router.delete('/profile/:id/delete', authenticateToken, async (req, res) => {
    try {
        // Access the authenticated user information using req.user
        const userId = req.user.userId;

        // Check if the required profile deletion matches the authenticated user
        if (userId !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: Youcan only delete your own profile.'});
        }

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found '});
        }

        // Delete the user record
        await user.destroy();

        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;