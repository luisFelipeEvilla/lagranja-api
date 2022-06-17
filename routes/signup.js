const express = require('express');
const User = require('../db/models/user');
const encryption = require('../utils/encryption');

const router = express.Router();

router.post('/signup', (req, res) => {
    const  { username, password } = req.body;

    if (username && password) {

        const user = new User({
            username,
            password: encryption.encrypt(password)
        })
    
        user.save((err, user) => {
            if ( err )  return res.status(500).send(err.message);
            res.status(200).json(user);
        })
    }
})

module.exports = router;