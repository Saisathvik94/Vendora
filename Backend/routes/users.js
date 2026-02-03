import { Router } from "express";
import { HandleUserProfile } from "../controllers/user.js";
import { HandleUpdateProfile } from "../controllers/user.js";
import { HandleUserOrders } from "../controllers/user.js";
import { restrictToLoggedInUser } from "../middleware/auth.js";
const router = Router();

router.get('/profile', restrictToLoggedInUser,HandleUserProfile)
router.patch('/profile', restrictToLoggedInUser,HandleUpdateProfile)
router.get('/orders', restrictToLoggedInUser,HandleUserOrders)


export default router;