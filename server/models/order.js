import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
    },
    phone: {
        type: String,
        required: true,
        minLength: 3,
    },
    address: {
        type: String,
        required: true,
        minLength: 3,
    },
}, {
    timestamps: true
});

export default mongoose.model('Order', schema);