import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET

export async function setUser(user){
    const payload = await {
        ...user
    }
    return jwt.sign(payload, secret)

}

export async function getUser(token){
    if(!token) return null
    return jwt.verify(token, secret)
}