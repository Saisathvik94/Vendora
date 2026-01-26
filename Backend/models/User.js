import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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

const UserData = mongoose.model("UserData", UserSchema)

export default UserData;