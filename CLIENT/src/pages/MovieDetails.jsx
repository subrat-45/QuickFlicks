import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  Film,
  Heart,
  PlayCircleIcon,
} from "lucide-react";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const getShowData = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast("Added to Favorites");
    } else {
      toast("Removed from Favorites");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    getShowData();
  }, [id]);

  return show ? (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20 lg:py-24 mt-10">

      <div className="w-full relative top-14 z-10">
        <BlurCircle top="-80px" left="280px" />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-12 relative">
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <div className="relative group">
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="w-full rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full border border-primary/30">
              <span className="text-primary font-bold text-sm tracking-wider">
                ENGLISH
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {show.movie.title}
            </h1>

            <div className="flex items-center gap-2 text-lg md:text-xl">
              <div className="flex items-center gap-1 bg-primary px-3 py-1 rounded-lg">
                <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
                <span className="font-bold text-slate-900">
                  {show.movie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-slate-400">
                ({show.movie.vote_count.toLocaleString()} votes)
              </span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {show.movie.overview}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {timeFormat(show.movie.runtime)}
              </span>
            </div>

            <span className="w-1 h-1 rounded-full bg-slate-600"></span>

            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {show.movie.genres.map((gener) => gener.name).join(", ")}
              </span>
            </div>

            <span className="w-1 h-1 rounded-full bg-slate-600"></span>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {show.movie.release_date.split("-")[0]}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex items-center justify-center gap-2 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95">
              <PlayCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Watch Trailer</span>
            </button>

            <a
              href="#dataSelect"
              className="flex items-center justify-center cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-slate-100 font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavoriteToggle}
              className="flex items-center justify-center cursor-pointer w-full sm:w-14 sm:h-14 px-6 py-3 sm:px-0 sm:py-0 bg-slate-800 hover:bg-slate-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 gap-2 sm:gap-0"
            >
              <Heart
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                  isFavorite
                    ? "fill-primary text-primary"
                    : "fill-none text-white"
                }`}
              />
              <span className="sm:hidden">
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
          </div>

          {show.movie.tagline && (
            <div className="pt-4 border-t border-slate-800">
              <p className="text-primary/80 italic text-lg">
                "{show.movie.tagline}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Your Favorite Cast
        </h2>

        <div className="relative">
          <div className="no-scrollbar overflow-x-auto w-full">
            <div className="flex gap-6 md:gap-8 py-4 px-1.5 min-w-max">
              {show.movie.casts.slice(0, 12).map((cast, indx) => (
                <div
                  key={indx}
                  className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={cast.profile_path}
                      alt={cast.name}
                      className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover border-4 border-slate-800 group-hover:border-primary transition-colors duration-300 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-300 group-hover:text-primary transition-colors duration-300 text-center max-w-[100px] line-clamp-2">
                    {cast.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          You May Also Like
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-20">
          {dummyShowsData.slice(0, 4).map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-10 md:mt-16">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/movies");
            }}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95 hover:text-lg"
          >
            <p>Show More</p>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xl text-slate-400">Loading...</p>
      </div>
    </div>
  );
};

export default MovieDetails;