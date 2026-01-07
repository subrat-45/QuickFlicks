import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate()

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const onBookingHandler = () => {
    if(!selectedDate) {
        return toast('Please select a date')
    }
    navigate(`/movies/${id}/${selectedDate}`)
    scrollTo(0,0)
  }

  return (
    <div
      id="dataSelect"
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 relative">
        <BlurCircle top="-200px" right="-100px" />
        <BlurCircle bottom="-200px" left="-100px" />

        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Choose Date & Time
            </h2>
          </div>

          <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="hidden sm:flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                ref={scrollRef}
                className="flex-1 overflow-x-auto no-scrollbar"
              >
                <div className="flex gap-3 md:gap-4 p-2 min-w-max">
                  {Object.keys(dateTime).map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      className={`flex flex-col items-center gap-2 px-6 py-4 cursor-pointer rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 min-w-[100px] ${
                        selectedDate === date
                          ? "bg-primary text-slate-900 shadow-lg shadow-primary/30"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {getDayName(date)}
                      </span>
                      <span className="text-2xl font-bold">
                        {new Date(date).getDate()}
                      </span>
                      <span className="text-xs font-medium">
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scroll("right")}
                className="hidden sm:flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/50 to-transparent pointer-events-none sm:hidden"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/50 to-transparent pointer-events-none sm:hidden"></div>
          </div>

          {/* {selectedDate && (
            <div className='space-y-4 animate-fadeIn'>
              <h3 className='text-xl md:text-2xl font-bold text-white'>Available Showtimes</h3>
              
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
                {dateTime[selectedDate].map((timeSlot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(timeSlot)}
                    className={`p-8 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                      selectedTime?.time === timeSlot.time
                        ? 'bg-primary text-slate-900 shadow-lg shadow-primary/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {timeSlot.time}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {selectedDate && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 animate-fadeIn">
              <div className="text-center sm:text-left">
                <p className="text-slate-400 text-sm mb-1">Your Selection</p>
                <p className="text-white text-lg md:text-xl font-bold">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button onClick={onBookingHandler} className="w-full sm:w-auto px-6 py-3 bg-primary hover:opacity-85 text-white font-bold text-lg md:text-xl rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary hover:scale-105 active:scale-95 active:shadow-md cursor-pointer group backdrop-blur-sm relative overflow-hidden">
                <span className="relative z-10 font-semibold tracking-wide uppercase">
                  Book Now
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default DateSelect;
