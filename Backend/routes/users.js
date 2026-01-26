import { Router } from "express";

const router = Router();

router.get('/profile', HandleUserProfile)
router.patch('/profile', HandleUpdateProfile)
router.get('/orders', HandleUserOrders)

export default router;