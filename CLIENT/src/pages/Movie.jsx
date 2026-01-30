import React from "react";
import { dummyShowsData } from "../assets/assets";
import GenreSection from "../components/GenreSection";
import { Film } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const Movie = () => {
  return dummyShowsData.length > 0 ? (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20 lg:py-24 relative mt-10">
      <div className="mb-8 md:mb-12 flex items-center gap-3 relative z-10">
        <Film className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Now Showing</h1>
      </div>
      
      <div className="relative z-10">
        <GenreSection movies={dummyShowsData} />
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