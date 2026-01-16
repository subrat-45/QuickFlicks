import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  poster_path : { type: String, required : true},
  backdrop_path : { type: String, required : true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  gener: { type : Array, required : true},
  year: { type: Date, required: true },
  rating: { type: Number, required: true },
  runTime: { type: Number, required: true },
  language: { type: String, required: true },
  tagline: { type: String, required: true },
  votes: { type: Number, required: true },
  cast: { type : Array, required: true },
  trailer: {
    poster: { type: String, required: true },
    link: { type: String, required: true },
  },
}, {timestamps: true});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
