import { Router } from 'express';
import Shop from '../models/shop.js';

const router = Router();

router.post('/shops', async (req, res) => {
    const { title } = req.body;
    try {
        const shop = await Shop.create({ title });
        res.status(201).send(shop);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/shops', async (req, res) => {
    try {
        const shops = await Shop.find();
        res.send(shops);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/shops/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const shop = await Shop.findOneAndDelete({ _id: id });
        if (!shop) {
            return res.status(404).send();
        }
        res.send(shop);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

export default router;