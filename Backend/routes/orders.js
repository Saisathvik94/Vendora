import { Router } from "express";
import { HandleCheckout } from "../controllers/orders.js";
import { HandleOrderById } from "../controllers/orders.js";
import { HandleOrderStatus } from "../controllers/orders.js"
import { restrictToLoggedInUser } from "../middleware/auth.js";

const router = Router()

router.post('/', restrictToLoggedInUser, HandleCheckout)
router.get('/:orderId', restrictToLoggedInUser, HandleOrderById)
router.get('/:orderId/status',restrictToLoggedInUser, HandleOrderStatus)




export default router;