import { Router } from "express";
import {
    checkAdmin,
    createSongs,
    deleteSongs,
    createAlbum,
    deleteAlbum,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check-Admin", checkAdmin);
router.post("/songs", createSongs);
router.delete("/songs/:id", deleteSongs);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
