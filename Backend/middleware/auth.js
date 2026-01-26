import { getUser } from "../services/auth.js";

export async function restrictToLoggedInUser(req, res, next){
    const id = req.cookies.token;
    if(!id) return null
    const user = getUser(id)
    if(!user) return null
    req.user = user
    next()

}

export async function checkAuth(req, res, next){
    const id = req.cookies.token;
    const user = getUser(id)
    req.user = user
    next()
} 