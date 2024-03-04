import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
}, {
    timestamps: true
});

shopSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'owner'
})

export default mongoose.model('Shop', shopSchema);