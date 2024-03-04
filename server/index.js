import express from 'express';
import mongoose from 'mongoose';
import Shop from './models/shop.js';
import shopRouter from './routers/shop.js';

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:eIpPrTtlQE2QNVFW@cluster0.dclces1.mongodb.net/';

const app = express();

app.use(express.json());
app.use(shopRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startApp();