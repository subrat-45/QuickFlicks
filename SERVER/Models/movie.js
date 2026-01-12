import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  description: { type: String, required: true },
  gener: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  year: { type: Date, required: true },
  rating: { type: Number, required: true },
  runTime: { type: String, required: true },
  lang: { type: String, required: true },
  tagline: { type: String, required: true },
  votes: { type: Number, required: true },
  cast: [
    {
      name: { type: String, required: true },
      profile: { type: String, required: true },
    },
  ],
  trailer: {
    poster: { type: String, required: true },
    link: { type: String, required: true },
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
