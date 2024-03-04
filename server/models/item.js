import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
    },
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
    }
}, {
    timestamps: true
});

export default mongoose.model('Item', itemSchema);