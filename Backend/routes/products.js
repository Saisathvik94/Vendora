import { Router } from "express";
import { HandleProducts } from "../controllers/products.js"
import { HandleProductById } from "../controllers/products.js";

const router = Router()

router.get('/', HandleProducts)
router.get('/:productId', HandleProductById)

export default router;