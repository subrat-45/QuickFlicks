import React, { useMemo } from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";
import BlurCircle from "./BlurCircle";

const GenreSection = ({ movies }) => {
  // Group movies by genre
  const moviesByGenre = useMemo(() => {
    const genreMap = {};

    movies.forEach((movie) => {
      // Extract genre names from the genres array
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genreObj) => {
          const genreName = genreObj.name;

          if (!genreMap[genreName]) {
            genreMap[genreName] = [];
          }
          genreMap[genreName].push(movie);
        });
      }
    });

    // Sort genres alphabetically
    return Object.keys(genreMap)
      .sort()
      .reduce((acc, key) => {
        acc[key] = genreMap[key];
        return acc;
      }, {});
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-12 md:space-y-16">
      {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
        <div key={genre} className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="flex items-center gap-2 group">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {genre}
              </h2>
            </div>
            <div className="flex-1 h-px"></div>
            <span className="text-sm text-white">
              {genreMovies.length}{" "}
              {genreMovies.length === 1 ? "movie" : "movies"}
            </span>
          </div>

          <div className="relative">
            <div className="w-full relative top-14 z-10">
              <BlurCircle top="-180px" right="-80px" />
            </div>
            <div className="no-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-auto px-5 py-5">
              {genreMovies.map((movie) => (
                <div
                  key={`${genre}-${movie._id}`}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreSection;
