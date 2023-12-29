const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, JWT_SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' });

};

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.replace("Bearer ", "");
    
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Forbidden' });
        } else {
            console.log('Token verified successfully!');
            // req.user = decoded;
            // console.log(decoded);
            next();
        }
    });
};

module.exports = {
    authenticate,
    generateToken,
};
