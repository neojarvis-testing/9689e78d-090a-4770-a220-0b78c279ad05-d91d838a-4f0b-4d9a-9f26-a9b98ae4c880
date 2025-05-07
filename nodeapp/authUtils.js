require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: '1h' });
};


const validateToken = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Authentication failed' });
        }
        const token = header.substring(7);
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { generateToken, validateToken };