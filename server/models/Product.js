import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

        title: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
        },
        description: {
            type: String,
            required: true,
            minlength: 8,
        },
        categories: {
            type: Array,
            required: true,
        },
        price: {
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
            // required: true
        }

    },
    {timestamps: true}
)


export const Product = mongoose.model("Product", ProductSchema);