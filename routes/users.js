import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';

// data base controllers
import { createUser, getUser } from '../db/controllers/user.js';

// errors 
import { ResourceAlreadyExistsError } from '../Errors/errors.js';

// configuration settings
import generateJWT from '../utils/generateJWT.js';
import user from '../db/models/user.js';

const router = Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            const user =  await createUser(username, password);

            const token = generateJWT(user);
            
            res.status(200).json({user, token});
        } catch (err) {
            res.status(500);
            if (err instanceof ResourceAlreadyExistsError) res.status(400);
            
            res.send({message:err.message});
        }
    }
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            const user = await getUser(username);
    
            if (user) {
                const authenticate = compareSync(password, user.password);
    
                const token = generateJWT(user);

                authenticate ? res.status(200).json({user, token}) : res.status(400).json({ error: "Error, wrong password" })
            } else {
                return res.status(404).json({ message: 'user not found' });
            }
        } catch (error) {
                res.status(500).json({ message: error.message}); 
        }
    }
})

export default router;