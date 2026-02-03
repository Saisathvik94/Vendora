import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    vendorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "VendorData", 
        required: true 
    },

    name : {
        type: String,
        required: true
    },
    stock : {
        type: Number,
        required: true,
        min: 0
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })

const ProductData = mongoose.model("ProductData", ProductSchema)

export default ProductData;