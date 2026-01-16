import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import { Film } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const Movie = () => {
  return dummyShowsData.length > 0 ? (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20 lg:py-24 relative mt-10">
      <BlurCircle top='150px' right='0px' />
      <BlurCircle bottom='50px' left='50px' />
      <div className="w-full relative top-14 z-10">
        <BlurCircle top='0px' right='-80px'/>
      </div>
      
      <div className="mb-8 md:mb-12 flex items-center gap-3">
        <Film className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Now Showing</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {dummyShowsData.map((show) => (
          <div key={show._id} className="animate-fadeIn">
            <MovieCard movie={show} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Film className="w-16 h-16 text-slate-600 mx-auto" />
        <p className="text-xl text-slate-400">No movies available</p>
      </div>
    </div>
  );
};

export default Movie;
