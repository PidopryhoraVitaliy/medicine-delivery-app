import mongoose from "mongoose";

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
}, {
    timestamps: true
});

export default mongoose.model('OrderItem', schema);