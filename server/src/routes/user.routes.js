import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser, getAllUserMessages } from "../controllers/user.controller.js";

const router = Router()

router.get("/", protectRoute, getAllUser)
router.get("/messages/:userId", protectRoute, getAllUserMessages)

export default router;