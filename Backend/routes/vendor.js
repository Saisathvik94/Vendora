import { Router } from "express";

const router = Router()

router.get('/profile', HandleVendorProfile)
router.put('/profile', HandleUpdateProfile)
router.get('/products', HandleVendorProducts)
router.post('/products', HandleVendorProducts)
router.delete('/product/:productId', HandleVendorProductsDelete)


export default router;