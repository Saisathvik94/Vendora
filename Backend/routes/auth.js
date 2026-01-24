import { Router } from "express";
import { HandleAuth } from "../controllers/auth"
const router = Router()

router.post('/', HandleAuth)

export default router;