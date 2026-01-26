import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        default: "user",
        immutable: true
    }
}, {timestamps: true})

const AdminData = mongoose.model("admin", AdminSchema)

export default AdminData;