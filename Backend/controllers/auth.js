import UserData from "../models/User";
import bcrypt from "bcryptjs"

async function HandleUserSignUp(req, res){
    const { name , email, password } = req.body;

    if(!name || !email || !password ) return res.status(403).json({message : "Enter details correctly"})
    
    const user = await UserData.findOne({
        email, password
    })

    if(user) return res.status(403).json({message : "User already exists"})

    const hashedPassword = await bcrypt.hash(password,10);
    await UserData.create({
        name,
        email,
        hashedPassword
    })

    res.status(201).json({message : "User created successfully"})
}

async function HandleUserLogin(req, res){
    const { email , password } = req.body

    if(!email || !password) return res.status(403).json({message : "Enter your details"})
    
    const user = await UserData.findOne({
        email, password
    })

    if(!user) return res.status(404).json({message : "Invalid username or password"})
    
    // setUser(JWTToken, user) Adding JWt Token do at last

    // res.cookie('token', JWTToken)
}