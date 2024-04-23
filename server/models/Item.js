import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
        categories: {
            type: Array,
            required: true,
        },
    cost: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
        image: {
            type: String,
            required: true,
        },
    inStock: {
        type: Boolean,
        default: true,
    },

},
    {timestamps: true}
    );

export const Item = mongoose.model("Item", ItemSchema);