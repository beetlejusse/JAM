import { Router } from "express";
import { getAllSong,getFeaturedSongs,getMadeForYouSongs,getTrendingSongs } from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/", protectRoute, requireAdmin , getAllSong)
router.get("/featuredSong", getFeaturedSongs)
router.get("/made-for-you", getMadeForYouSongs)
router.get("/trending-song", getTrendingSongs)

export default router;