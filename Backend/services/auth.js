import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET

export function setUser(user){
    const payload = {
        ...user
    }
    return jwt.sign(payload, secret)

}

export function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret); // returns decoded payload
    } catch (err) {
        console.error("JWT verify error:", err.message);
        return null;
    }
}