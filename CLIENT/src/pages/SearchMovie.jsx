import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyShowsData } from '../assets/assets';

const SearchMovie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const navigate = useNavigate();

  // Filter movies based on search query
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return dummyShowsData;
    }
    
    return dummyShowsData.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handle hover with delay
  useEffect(() => {
    let timer;
    if (hoveredMovie) {
      timer = setTimeout(() => {
        setShowDetails(hoveredMovie);
      }, 500); // 0.5 second delay
    } else {
      setShowDetails(null);
    }

    return () => clearTimeout(timer);
  }, [hoveredMovie]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleBookTicket = (movie) => {
    navigate(`/movies/${movie._id}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Search Section - Centered */}
      <div className="shrink-0 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="w-full max-w-3xl relative z-10">
          {/* Logo or Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 bg-linear-to-r from-white via-red-500 to-white bg-clip-text">
              Find Your Movie
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Search from our collection of amazing movies
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 pl-16 pr-14 py-5 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-red-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Search Info */}
          {searchQuery && (
            <div className="mt-4 text-center text-slate-400 text-sm animate-fadeIn">
              Found <span className="text-white font-semibold">{filteredMovies.length}</span>{' '}
              {filteredMovies.length === 1 ? 'movie' : 'movies'}
            </div>
          )}
        </div>
      </div>

      {/* Movies Section - Single Scrollable Row */}
      <div className="flex-1 px-4 md:px-8 lg:px-16 xl:px-24 pb-16">
        {filteredMovies.length > 0 ? (
          <div className="relative ">
            <div className="overflow-x-auto overflow-y-visible pb-8 no-scrollbar ">
              <div className="flex gap-6 md:gap-8 px-4 py-8">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie._id}
                    className="shrink-0 w-64 md:w-72 group cursor-pointer relative"
                    onMouseEnter={() => setHoveredMovie(movie._id)}
                    onMouseLeave={() => setHoveredMovie(null)}
                  >
                    {/* Movie Card */}
                    <div className={`bg-linear-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 transition-all duration-500 ${
                      showDetails === movie._id 
                        ? 'opacity-0 pointer-events-none' 
                        : 'opacity-100 hover:border-red-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20'
                    }`}>
                      {/* Poster Image */}
                      <div className="relative aspect-2/3 overflow-hidden">
                        <img
                          src={movie.poster_path}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </div>

                      {/* Movie Info */}
                      <div className="p-4">
                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                          </div>
                          <span className="text-slate-400 text-sm">
                            {(movie.vote_count / 1000).toFixed(1)}K votes
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                          {movie.title}
                        </h3>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {movie.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre.id}
                              className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md"
                            >
                              {genre.name}
                            </span>
                          ))}
                          {movie.genres.length > 2 && (
                            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">
                              +{movie.genres.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Release Date */}
                        <p className="text-slate-400 text-sm">
                          {new Date(movie.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Expanded Details Card - Shows on Hover */}
                    {showDetails === movie._id && (
                      <div className="absolute top-0 left-0 w-full z-50 animate-fadeIn">
                        <div className="bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border-2 border-red-500 shadow-2xl shadow-red-500/40 overflow-hidden">
                          {/* Backdrop Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={movie.backdrop_path}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                          </div>

                          {/* Movie Details */}
                          <div className="p-5 -mt-16 relative z-10">
                            {/* Poster Thumbnail */}
                            <div className="flex gap-4 mb-4">
                              <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-24 h-36 object-cover rounded-lg border-2 border-slate-800 shadow-xl shrink-0"
                              />
                              <div className="flex-1 flex flex-col justify-end">
                                <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                                  {movie.title}
                                </h3>
                                {movie.tagline && (
                                  <p className="text-red-400 italic text-sm mb-2 line-clamp-1">
                                    {movie.tagline}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Rating & Info */}
                            <div className="flex items-center gap-3 mb-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-white font-semibold">
                                  {movie.vote_average.toFixed(1)}/10
                                </span>
                              </div>
                              <span className="text-slate-400">
                                {(movie.vote_count / 1000).toFixed(1)}K
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-400">{movie.runtime} min</span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {movie.genres.map((genre) => (
                                <span
                                  key={genre.id}
                                  className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md"
                                >
                                  {genre.name}
                                </span>
                              ))}
                            </div>

                            {/* Overview */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {movie.overview}
                            </p>

                            {/* Release Date */}
                            <p className="text-slate-400 text-xs mb-4">
                              Release: {new Date(movie.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>

                            {/* Book Ticket Button */}
                            <button
                              onClick={() => handleBookTicket(movie)}
                              className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Calendar className="w-5 h-5" />
                              Book Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Gradient Fade Effect */}
            <div className="absolute right-0 top-0 bottom-8 w-32 bg-linear-to-l from-black to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-slate-400 text-center max-w-md">
              We couldn't find any movies matching "{searchQuery}". Try searching with a different title.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchMovie;