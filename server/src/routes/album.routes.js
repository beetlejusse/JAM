import { Router } from "express";
import { getAllAlbums, getAlbumById} from "../controllers/album.controller.js";

const router = Router()

router.get("/get-albums", getAllAlbums)
router.get("/get-albums/:albumId", getAlbumById)

export default router;