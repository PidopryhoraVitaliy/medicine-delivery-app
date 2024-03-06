import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
}, {
    timestamps: true
});

export default mongoose.model('Item', itemSchema);