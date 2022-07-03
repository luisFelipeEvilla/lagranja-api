import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config.js';

export const generateToken = (user) => {
    const token = jwt.sign(
        { _id: user._id, username: user.username },
        jwtSecret,
        {
            expiresIn: '3d'
        }
    )

    return token;
}

export default generateToken;