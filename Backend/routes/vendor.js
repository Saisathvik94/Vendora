import { Router } from "express";
import { restrictToLoggedInUser } from "../middleware/auth.js";
import { HandleVendorProfile } from "../controllers/vendor.js";
import { HandleUpdateProfile } from "../controllers/vendor.js";
import { HandleGetVendorProducts } from "../controllers/vendor.js";
import { HandlePostVendorProducts } from "../controllers/vendor.js";
import { HandleUpdateVendorProduct } from "../controllers/vendor.js";
import { HandleVendorProductDelete } from "../controllers/vendor.js";
import { HandleVendorOrders } from "../controllers/vendor.js";


const router = Router()

router.get('/profile', restrictToLoggedInUser, HandleVendorProfile)
router.patch('/profile',restrictToLoggedInUser, HandleUpdateProfile)
router.get('/products', restrictToLoggedInUser,HandleGetVendorProducts)
router.post('/products',restrictToLoggedInUser, HandlePostVendorProducts)
router.patch('/product/:productId', restrictToLoggedInUser, HandleUpdateVendorProduct)
router.delete('/product/:productId',restrictToLoggedInUser, HandleVendorProductDelete)
router.get('/orders',restrictToLoggedInUser, HandleVendorOrders)


export default router;