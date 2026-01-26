import { Router } from "express";
const router = Router()

router.post('/', HandleOrders)
router.get('/user', HandleUserOrders)
router.get('/vendor', HandleVendorOrders)
router.get('/:orderId', HandleOrderById)
router.get('/:orderId/status', HandleOrderStatus)


export default router;