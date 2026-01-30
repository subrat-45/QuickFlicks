import axios from "axios";
import Movie from "../Models/movie.js";
import Show from "../Models/show.js";

export const movies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      },
    );

    return res.data.results;
  } catch (err) {
    console.error("TMDB ERROR : ", err.response?.data || err.code);
    throw err;
  }
};

export const shows = async (movieId, showsInput, showPrice) => {
  try {
    let movie = await Movie.findById(movieId);

    if (!movie) {
      const [detailsRes, creditsRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos`,
          { headers: { Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` } }
        ),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` },
        }),
      ]);

      const d = detailsRes.data;
      const c = creditsRes.data;

      movie = await Movie.create({
        id: d.id,
        title: d.title,
        description: d.overview,
        releaseDate: d.release_date,
        posterPath: d.poster_path,
        backdropPath: d.backdrop_path,
        voteAverage: d.vote_average,
        voteCount: d.vote_count,
        genres: d.genres.map(g => g.name),
        cast: c.cast.map(a => ({
          id: a.id,
          name: a.name,
          character: a.character,
          profilePath: a.profile_path,
        })),
        tagline: d.tagline || "",
        year: d.release_date ? new Date(d.release_date).getFullYear() : null,
        language: d.original_language,
        trailer: {
          poster: d.poster_path,
          link: d.videos?.results?.[0]?.key
            ? `https://www.youtube.com/watch?v=${d.videos.results[0].key}`
            : ""
        }
      });
      
    }

    const showsToCreate = [];

    showsInput.forEach(show => {
      show.time.forEach(time => {
        showsToCreate.push({
          movie: movie._id,
          showDateTime: new Date(`${show.date}T${time}`),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length) {
      await Show.insertMany(showsToCreate);
    }

    return { movie, showsCreated: showsToCreate.length };

  } catch (err) {
    console.error("SHOW CREATION ERROR:", err.message);
    throw err;
  }
};
