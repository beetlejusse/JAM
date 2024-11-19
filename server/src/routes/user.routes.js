import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser } from "../controllers/user.controller.js";

const router = Router()

router.get("/", protectRoute, getAllUser)

export default router;