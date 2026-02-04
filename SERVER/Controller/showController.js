import { validationResult } from "express-validator";
import { movies, shows } from "../Services/showService.js";

export const getNowPlayingMovies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const movieList = await movies(); 
    res.status(200).json({ success: true, movies: movieList });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const addShows = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { movieId, showsInput, showPrice } = req.body;

    const result = await shows(movieId, showsInput, showPrice);

    res.status(201).json({
      success: true,
      message: "Shows created successfully",
      movie: result.movie,
      totalShowsCreated: result.showsCreated.length,
    });
  } catch (error) {
    console.error("CONTROLLER ERROR FULL:", error.response?.data || error.message || error);
    res.status(500).json({ 
      error: "Failed to create shows", 
      details: error.response?.data || error.message || error 
    });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const data = await allShows();
    res.status(200).json({ success: true, shows: data.shows });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shows" });
  }
};

export const getShowById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const data = await show(movieId);

    if (!data.movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      success: true,
      movie: data.movie,
      dateTime: data.dateTime
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch show" });
  }
};
