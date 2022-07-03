import { Router } from 'express';
import Product from '../db/models/product.js';
import { createSupplier, getSupplier, getSuppliers, updateSupplier } from '../db/controllers/supplier.js';
import { ResourceNotFoundError } from '../Errors/errors.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const suppliers = await getSuppliers();

        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const supplier = await getSupplier(_id);

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500);
        if (error instanceof ResourceNotFoundError) res.status(404);

        res.json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;

    if (!firstName || !lastName) return res.status(400).json({ message: 'You should pass a firstName and lastName' })

    const supplier = {
        firstName,
        lastName,
        phoneNumber
    };

    try {
        const result = await createSupplier(supplier);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
            if (err) return res.status(500).json({ message: err.message });

            res.status(200).json(product);
        });
    } else {
        return res.status(400).json({ message: 'Should pass product quantity and name' });
    }
})

router.put('/:id', async (req, res) => {
    const _id = req.params.id;

    const { firstName, lastName, phoneNumber } = req.body;

    const supplier = {
        firstName,
        lastName,
        phoneNumber
    };

    try {
        const updatedSupplier = await updateSupplier(_id, supplier);

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500);
        if (error instanceof ResourceNotFoundError) res.status(404);

        res.json({ message: error.message });
    }
});

export default router;