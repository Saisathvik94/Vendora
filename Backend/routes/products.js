import { Router } from "express";
import { HandleProducts } from "../controllers/products"
const router = Router()

router.post('/', HandleProducts)

export default router;