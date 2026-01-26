
export async function restrictToRole(...ALLOWED_ROLES){
    return (req, res, next) => {
        if(!req.user || !ALLOWED_ROLES.includes(req.user.role)){
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    }
}