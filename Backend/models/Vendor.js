import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select: false
    },
    businessName : {
        type : String,
        required : true
    }
}, {timestamps: true})

const VendorData = mongoose.model("VendorData", VendorSchema)

export default VendorData;