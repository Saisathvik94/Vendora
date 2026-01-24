import { Router } from "express";
import { HandleOrders } from "../controllers/orders"
const router = Router()

router.post('/', HandleOrders)

export default router;