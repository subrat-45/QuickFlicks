import {Router} from "express";
import {addShows, getAllShows, getNowPlayingMovies, getShowById} from "../Controller/showController.js";
import {protectAdmin} from "../Middlewares/auth.js";

const router = Router();

router.get("/now-playing", getNowPlayingMovies);
router.post("/add", addShows);
router.post("/all", getAllShows);
router.get("/:movieId", getShowById);

export default router;