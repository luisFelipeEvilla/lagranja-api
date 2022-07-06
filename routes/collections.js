import { Router } from 'express';
import { createProduct } from '../db/controllers/product.js';

const router = Router();

router.post('/', (req, res) => {
    const collection = req.body;

    if (collection === null) return res.status(400).json({ message: "Should pass a collection" });

    const promises = [];
    collection.forEach(product => {
        promises.push(createProduct(product));
    });

    Promise.all(promises)
        .then(() => res.status(200).json({ message: "Success!" }))
        .catch(error => res.status(500).json({ message: error.message }));
})

export default router;
