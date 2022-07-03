const express = require('express');
const Supplier = require('../db/models/supplier');
const Product = require('../db/models/product');

const router = express.Router();

router.get('/', (req, res) => {
    Supplier.find((err, suppliers) => {
        if (err) return res.status(500).json({ message: err });

        res.status(200).json(suppliers);
    })
})

router.get('/:id', (req, res) => {
    const _id = req.params.id;

    Supplier.findOne({ _id})
        .exec((err, supplier) => {
            if (err) return res.status(500).json({ message: err.message });

            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            Product.find({supplier: _id})
                .exec((err, products) => {
                    if (err) return res.status(500).json({ message: err.message });

                    supplier.products = products;

                    res.status(200).json(supplier);
                })
        });
})

router.post('/', (req, res) => {
    const { firstName, lastName } = req.body;

    if (firstName && lastName) {
        const supplier = new Supplier({
            firstName,
            lastName
        })

        supplier.save((err, supplier) => {
            if (err) return res.status(500).json({ message: err.message });

            res.status(200).json(supplier);
        })
    } else {
        return res.status(400).json({ message: 'You should pass a firstName and lastName' })
    }
})

router.post('/:id/product', (req, res) => {
    const supplier = req.params.id;
    const { quantity, name, description } = req.body;

    if (quantity && name) {

        const product = new Product({
            supplier,
            quantity,
            name,
            description
        })

        product.save((err, product) => {
            if (err) return res.status(500).json({ message: err.message});

            res.status(200).json(product);
        });
    } else {
        return res.status(400).json({ message: 'Should pass product quantity and name' });
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
        Supplier.findOneAndUpdate({ _id }, supplier, options, (err, supplier) => {
            if (err) return res.status(500).json({ message: err.message });

            if (supplier) {
                res.status(200).json(supplier);
            } else {
                return res.status(404).json({ message: 'Supplier not found' });
            }
        });
    } else {
        return res.status(400).json({ message: 'You should pass a first name and last name' })
    }
});

module.exports = router;