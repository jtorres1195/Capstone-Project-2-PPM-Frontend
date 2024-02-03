const jwt = require('jsonwebtoken');

// Middleware function to check for a valid token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token'});
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token'});
        }

        req.user = user;
        next();
    })
}

module.exports = { authenticateToken };