import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_KEY } from '../config/config.js';

export const tokenEncode = (email, userId) => {
    const KEY = JWT_KEY;
    const EXPIRY = { expiresIn: JWT_EXPIRY };

    const PAYLOAD = {
        email: email,
        userId: userId,
    };

    try {
        const token = jwt.sign(PAYLOAD, KEY, EXPIRY);
        console.log('Generated Token:', token);  
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null; 
    }
};

export const tokenDecode = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        throw error;
    }
};