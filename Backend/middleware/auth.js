import { getUser } from "../services/auth.js";

export function restrictToLoggedInUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    const user = getUser(token);
    req.user = user;
    next();
}
