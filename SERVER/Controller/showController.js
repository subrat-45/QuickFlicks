import { validationResult } from "express-validator";
import { movies } from "../Services/showService.js";

export const getNowPlayingMovies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nowPlaying = await movies();
    res.status(200).json(nowPlaying);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const getShows = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { movieId, showsInput, showPrice } = req.body;

    const result = await createShows(movieId, showsInput, showPrice);

    res.status(201).json({
      message: "Shows created successfully",
      movie: result.movie,
      totalShowsCreated: result.showsCreated,
    });
  } catch (error) {
    console.error("CONTROLLER ERROR:", error.message);
    res.status(500).json({ error: "Failed to create shows" });
  }
};
