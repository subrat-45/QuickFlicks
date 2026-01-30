import React, { useState } from 'react';
import { Play, X, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import BlurCircle from './BlurCircle';

const TrailerSection = ({ movieId, movieTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Mock trailer URL - in production, this would come from your API
  const trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${isMuted ? 1 : 0}`;

  const handlePlayTrailer = () => {
    setIsPlaying(true);
  };

  const handleCloseTrailer = () => {
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div id="trailer" className="w-full mt-10 md:mt-22 space-y-6 md:space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Watch Trailer
        </h2>
        <p className="text-slate-400 text-base md:text-lg">
          Get a sneak peek of the action
        </p>
      </div>

      {/* Trailer Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
        {!isPlaying ? (
          // Thumbnail with Play Button
          <div className="relative w-full h-full">
            {/* Thumbnail Image - Replace with actual movie backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    {/* Animated rings around play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 animate-ping"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/30 animate-pulse"></div>
                    </div>
                    
                    {/* Play Button */}
                    <button
                      onClick={handlePlayTrailer}
                      className="relative cursor-pointer z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl shadow-primary/50 group"
                    >
                      <Play className="w-10 h-10 md:w-12 md:h-12 fill-slate-900 text-slate-900 ml-2" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-white font-bold text-xl md:text-2xl">
                      Play Trailer
                    </p>
                    <p className="text-slate-400 text-sm md:text-base">
                      Official Trailer • HD
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ) : (
          // Video Player
          <div className="relative w-full h-full bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={trailerUrl}
              title={`${movieTitle} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video Controls Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleCloseTrailer}
                  className="p-2 bg-slate-800/80 hover:bg-red-600 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span>Official Trailer</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span>HD Quality</span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span>Available in English</span>
      </div>
    </div>
  );
};

export default TrailerSection;
// Demo Usage
// export default function App() {
//   return (
//     <div className="min-h-screen bg-transparent">
//       <div className="max-w-6xl mx-auto">
//         <TrailerSection 
//           movieId="123" 
//           movieTitle="Sample Movie"
//         />
//       </div>
//     </div>
//   );
// }