import { Router } from 'express';
import Item from '../models/item.js';

const router = Router();

router.post('/items/', async (req, res) => {
    const { owner, title, description } = req.body;
    try {
        const item = await Item.create({ owner, title, description });
        res.status(201).send(item);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findOneAndDelete({ _id: id });
        // if (!item) {
        //     return res.status(404).send();
        // }
        res.send(item);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

export default router;