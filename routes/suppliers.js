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

router.put('/', async (req, res) => {
    const { _id, firstName, lastName } = req.body;

    if (firstName && lastName) { 
        const supplier = {
            firstName,
            lastName
        }

        const options = {
            new: true
        }
        Supplier.findOneAndUpdate({_id}, supplier, options, (err, supplier) => {
            if (err)  return res.status(500).json({message: err});

            if (supplier) {
                res.status(200).json(supplier);
            } else {
                return res.status(404).json({message: 'Supplier not found'});
            }
        });
    } else {
        return res.status(400).json({message: 'You should pass a first name and last name'})
    }
});

module.exports = router;