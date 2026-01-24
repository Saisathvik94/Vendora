import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    stock : {
        type: Number,
        required: true,
        min: 0
    },
    price : {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })

const ProductData = mongoose.model("ProductData", ProductSchema)

export default ProductData;