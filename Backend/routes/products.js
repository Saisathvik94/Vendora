import { Router } from "express";
const router = Router()

router.get('/', HandleProducts)
router.get('/product/:productId', HandleproductById)

export default router;