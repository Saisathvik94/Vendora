import { Router } from "express";
import { HandleUserSignUp, HandleUserLogin, HandleLogOut, HandleLoggedIn } from "../controllers/auth.js";
import { restrictToLoggedInUser} from "../middleware/auth.js"
const router = Router()


router.post("/signup/:role",HandleUserSignUp);
router.post("/login/:role", HandleUserLogin);
router.post("/logout", restrictToLoggedInUser,HandleLogOut)
router.get("/profile", restrictToLoggedInUser, HandleLoggedIn)

export default router;