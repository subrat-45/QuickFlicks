import React, { useState } from "react";
import { Calendar, Clock, X, Plus, Film } from "lucide-react";
import BlurCircle from "../../components/BlurCircle";

const AddShows = () => {
  const [showPrice, setShowPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeInput, setTimeInput] = useState("");

  const handleAddTime = () => {
    if (timeInput && !selectedTimes.includes(timeInput)) {
      setSelectedTimes([...selectedTimes, timeInput]);
      setTimeInput("");
    }
  };

  const handleRemoveTime = (timeToRemove) => {
    setSelectedTimes(selectedTimes.filter((time) => time !== timeToRemove));
  };

  const handleAddShow = () => {
    // Handle show submission logic here
    console.log({
      price: showPrice,
      date: selectedDate,
      times: selectedTimes,
    });
  };

  // Dummy movie data for display
  const dummyMovies = [
    {
      id: 1,
      title: "Mission Impossible",
      subtitle: "THE FINAL RECKONING",
      genres: "Action, Adventure, Thriller",
      rating: 4.5,
      votes: "40.6K Votes",
      poster:
        "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    },
    {
      id: 2,
      title: "Mission Impossible",
      subtitle: "THE FINAL RECKONING",
      genres: "Action, Adventure, Thriller",
      rating: 4.5,
      votes: "40.6K Votes",
      poster:
        "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    },
    {
      id: 3,
      title: "Mission Impossible",
      subtitle: "THE FINAL RECKONING",
      genres: "Action, Adventure, Thriller",
      rating: 4.5,
      votes: "40.6K Votes",
      poster:
        "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    },
    {
      id: 4,
      title: "Mission Impossible",
      subtitle: "THE FINAL RECKONING",
      genres: "Action, Adventure, Thriller",
      rating: 4.5,
      votes: "40.6K Votes",
      poster:
        "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black relative">
      <div className="relative z-10 py-5 px-2 bg-slate-900">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Now <span className="text-red-500">Playing</span>
          </h1>
        </div>

        {/* Movie Grid */}
        <div className="no-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 overflow-x-auto px-3 py-5">
          {dummyMovies.map((movie) => (
            <div key={movie.id} className="relative group cursor-pointer">
              {/* Movie Card */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500 transition-all duration-300 transform hover:scale-105">
                {/* Bookmark Icon */}
                <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>

                {/* Poster Image */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white font-semibold">
                        {movie.rating}/5
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">
                      {movie.votes}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-slate-400 text-xs mb-2">{movie.genres}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Show Form */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8 max-w-2xl">
          {/* Show Price */}
          <div className="mb-6">
            <label className="text-white font-semibold text-lg mb-3 block">
              Show Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                $
              </span>
              <input
                type="number"
                value={showPrice}
                onChange={(e) => setShowPrice(e.target.value)}
                placeholder="Enter show price"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 pl-8 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="mb-6">
            <label className="text-white font-semibold text-lg mb-3 block">
              Select Date and Time
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 pl-11 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-32">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 pl-11 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handleAddTime}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Time
                </button>
              </div>
            </div>
          </div>

          {/* Selected Date-Time */}
          {(selectedDate || selectedTimes.length > 0) && (
            <div className="mb-6">
              <label className="text-white font-semibold text-lg mb-3 block">
                Selected Date-Time
              </label>
              {selectedDate && (
                <div className="text-slate-300 mb-3">{selectedDate}</div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedTimes.map((time, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-3"
                  >
                    <span className="text-white">{time}</span>
                    <button
                      onClick={() => handleRemoveTime(time)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Show Button */}
          <button
            onClick={handleAddShow}
            disabled={!showPrice || !selectedDate || selectedTimes.length === 0}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Add Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddShows;
