import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle'
import { Play } from 'lucide-react'

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className='w-full relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-12'>
                Trailers
            </h2>

            <div className='max-w-6xl mx-auto space-y-6 md:space-y-8 relative'>
                <BlurCircle top='0px' right='-80px'/>
                <BlurCircle left='0px' bottom='-80px'/>
                <div className='relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl group'>
                    <img 
                        src={currentTrailer.image} 
                        alt="Current trailer"
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent'></div>
                    
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-primary/50'
                    >
                        <Play className='w-10 h-10 md:w-12 md:h-12 text-slate-900 fill-slate-900 ml-1 cursor-pointer' />
                    </button>

                    {isPlaying && (
                        <div className='absolute inset-0 bg-black z-10'>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${currentTrailer.videoUrl.split('v=')[1]}?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='w-full h-full'
                            ></iframe>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <div className='flex gap-4 p-2 min-w-max'>
                            {dummyTrailers.map((trailer, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentTrailer(trailer)
                                        setIsPlaying(false)
                                    }}
                                    className={`relative cursor-pointer w-48 md:w-56 lg:w-64 aspect-video rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                                        currentTrailer.videoUrl === trailer.videoUrl 
                                            ? 'ring-4 ring-primary shadow-lg shadow-primary/30' 
                                            : 'opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img 
                                        src={trailer.image} 
                                        alt={`Trailer ${index + 1}`}
                                        className='w-full h-full object-cover'
                                    />
                                    
                                    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent'></div>
                                    
                                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/30'>
                                        <Play className='w-6 h-6 text-white fill-white ml-0.5' />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none'></div>
                    <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none'></div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}

export default TrailerSection