const express = require('express');
const Supplier = require('../db/models/supplier');

const router = express.Router();

router.get('/', (req, res) => {
    Supplier.find((err, suppliers) => {
        if (err) return res.status(500).json({message: err});

        res.status(200).json(suppliers);
    })
})

router.post('/', (req, res) => {
    const { firstName, lastName } = req.body;
    
    if (firstName && lastName) {
        const supplier = new Supplier({
            firstName,
            lastName
        })

        supplier.save((err, supplier) => {
            if (err) return res.status(500).json({message: err});

            res.status(200).json(supplier);
        })
    } else {
        return res.status(400).json({message: 'You should pass a first name and last name'})
    }
})

module.exports = router;