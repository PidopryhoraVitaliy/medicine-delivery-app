import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import shopRouter from './routers/shop.js';
import itemRouter from './routers/item.js';
import orderRouter from './routers/order.js';

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:eIpPrTtlQE2QNVFW@cluster0.dclces1.mongodb.net/';

const app = express();

app.use(cors());
app.use(express.json());
app.use(shopRouter);
app.use(itemRouter);
app.use(orderRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startApp();