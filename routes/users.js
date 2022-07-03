import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

// data base models
import User from '../db/models/user.js';

// configuration settings
import {jwtSecret} from '../config.js';

const router = Router();

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {

        const user = new User({
            username,
            password
        })

        const salt = genSaltSync(10);
        user.password = hashSync(password, salt);

        user.save((err, user) => {
            if (err) return res.status(500).send(err.message);

            const token = jwt.sign(
                { _id: user._id, username: user.username },
                jwtSecret,
                {
                    expiresIn: '3d'
                }
            )
            
            res.status(200).json({user, token});
        })
    }
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const user = await User.findOne({ username });

        if (user) {
            const authenticate = compareSync(password, user.password);

            const token = jwt.sign(
                { _id: user._id, username: user.username },
                jwtSecret,
                {
                    expiresIn: '3d'
                }
            )
            
            authenticate ? res.status(200).json({user, token}) : res.status(400).json({ error: "Error, wrong password" })
        } else {
            return res.status(404).json({ message: 'user not found' });
        }
    }
})

export default router;