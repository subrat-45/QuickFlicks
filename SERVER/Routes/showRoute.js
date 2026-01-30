import {Router} from "express";
import {getNowPlayingMovies} from "../Controller/showController.js";

const router = Router();

router.get("/now-playing", getNowPlayingMovies);

export default router;