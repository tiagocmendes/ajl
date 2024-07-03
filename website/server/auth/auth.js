const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const dotenv = require('dotenv');
dotenv.config();

// Middleware to check if the token is valid and attach the user object to the request
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
};

// Helper function to generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '24h' });
};

const secretKey = process.env.SECRET_KEY;

const encryptText = (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
};
  
// Function to decrypt text using AES decryption
const decryptText = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};

module.exports = { authenticateToken, generateToken, encryptText, decryptText };