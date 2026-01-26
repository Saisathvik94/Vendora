import { Router } from "express";

const router = Router();

router.get('/dashboard', HandleAdminDashboard)
router.get('/vendors', HandleVendors)
router.put('/vendor/:vendorId/approve', HandleApproveVendor)
router.put('/vendor/:vendorId/reject', HandleRejectVendor)

router.get('/users', HandleUsers)
router.get('/orders', HandleOrders)
router.get('/analytics', HandleAnalytics)

export default router;