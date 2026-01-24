import { Router } from "express";
import { HandleVendor } from "../controllers/vendor"
const router = Router()

router.post('/', HandleVendor)

export default router;