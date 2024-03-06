import { Router } from 'express';
import Order from '../models/order.js';
import OrderItem from '../models/orderItem.js';
import Item from '../models/item.js';

const router = Router();

router.post('/orders', async (req, res) => {
    const { name, email, phone, address, items } = req.body;
    try {
        const order = await Order.create({ name, email, phone, address });
        items.map(async (i) => {
            const item = await Item.findById(i._id);
            if (!item) {
                return res.status(404).send(`Can't find item by id: ${i._id}`);
            }
            await OrderItem.create({ owner: order._id, itemId: item._id, title: i.title, price: i.price });
        })
        res.status(201).send(order);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// router.get('/shops', async (req, res) => {
//     try {
//         const shops = await Shop.find();
//         res.send(shops);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// });

// router.get('/shops/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const shop = await Shop.findById(id);
//         const items = await Item.find({ owner: id });
//         res.send({ shop, items });
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// });


export default router;