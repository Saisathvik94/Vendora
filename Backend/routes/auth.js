import { Router } from "express";
import { HandleUserSignUp, HandleUserLogin, HandleLogOut } from "../controllers/auth.js";
import { checkAuth } from "../middleware/auth.js"
const router = Router()


router.post("/signup/:role",HandleUserSignUp);
router.post("/login/:role", HandleUserLogin);
router.post("/logout", checkAuth,HandleLogOut)

export default router;