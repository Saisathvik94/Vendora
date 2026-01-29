import UserData from "../models/User.js";
import VendorData from "../models/Vendor.js";
import AdminData from "../models/Admin.js";
import bcrypt from "bcryptjs"
import { setUser } from "../services/auth.js";



export async function HandleUserSignUp(req, res){
    const ALLOWED_ROLES = ["user", "vendor"]
    try { 
        const { name , email, password, businessName } = req.body;
        const role = req.params.role;

        if (!ALLOWED_ROLES.includes(role)) return res.status(400).json({ message: "Invalid role type" });

        if(role === "user"){
            if(!name || !email || !password) return res.status(400).json({message : "Enter details correctly"})
        } else {
            if(!name || !email || !password || !businessName) return res.status(400).json({message : "Enter details correctly"})
        }
        
        
        let user;

        if (role === "user"){
            user = await UserData.findOne({ email })
        } else if (role === "vendor"){
            user = await VendorData.findOne({ email })
        }

        if(user) return res.status(409).json({message : "User already exists"})

        const hashedPassword = await bcrypt.hash(password,10);
        if (role === "user"){
            await UserData.create({
                name,
                email,
                password: hashedPassword,
                role
            })
        } else if (role === "vendor"){
            await VendorData.create({
                name,
                email,
                password: hashedPassword,
                businessName,
                role
            })
        }
        

        res.status(201).json({message : "User created successfully"})
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function HandleUserLogin(req, res){
    const ALLOWED_ROLES = ["user", "vendor", "admin"]
    try {
        const { email , password } = req.body
        const role = req.params.role;

        if (!ALLOWED_ROLES.includes(role)) return res.status(400).json({ message: "Invalid role type" });

        if(!email || !password) return res.status(403).json({message : "Enter your details"})
        
        let user;

        if (role === "user"){
            user = await UserData.findOne({ email })
        } else if (role === "vendor"){
            user = await VendorData.findOne({ email })
        } else {
            user = await AdminData.findOne({ email })
        } 

        if(!user) return res.status(401).json({message : "Invalid username or password"})

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(401).json({message : "Invalid username or password"})

        
        const token = await setUser({ id: user._id, name: user.name,role : user.role, email : user.email});
        res.cookie('token', token,{
            httpOnly: true,
            sameSite: "lax",
            secure: false,   // true ONLY in HTTPS
        })
        res.status(200).json({message: "LoggedIn sucessfully" , user: { name: user.name, role: user.role}})
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}


export async function HandleLogOut(req, res){
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        })
        res.status(200).json({ message: "Logged out successfully" });
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function HandleLoggedIn(req, res){
    try{
        if (req.user){
            return res.status(200).json({ loggedIn: true, user: req.user })
        }
        return res.status(200).json({ loggedIn: false })
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}