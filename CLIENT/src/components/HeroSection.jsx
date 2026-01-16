import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Clock, Play, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full min-h-screen flex items-end bg-[url("/backgroundImage.png")] bg-cover bg-center bg-no-repeat overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'></div>
      
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-20 overflow-x-hidden'>
        <div className='max-w-3xl space-y-3 sm:space-y-4 md:space-y-6'>
          <img 
            src={assets.marvelLogo} 
            alt="Marvel Logo" 
            className='w-24 sm:w-32 md:w-40 lg:w-48 mb-2 sm:mb-4 md:mb-6'
          />
          
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight'>
            Guardians <br /> of the Galaxy
          </h1>
          
          <div className='flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6 text-white/90'>
            <span className='text-xs sm:text-sm md:text-base lg:text-lg font-medium'>
              Action • Adventure • Sci-fi
            </span>
            
            <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base'>
              <Calendar className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
              <span>2008</span>
            </div>
            
            <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base'>
              <Clock className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
              <span>2h 6min</span>
            </div>
          </div>

          <p className='text-white/80 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed'>
            After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil and protect the world as Iron Man.
          </p>

          <div className='flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4'>
            <button onClick={() => {navigate('/movies'); scrollTo(0,0)}} className='flex cursor-pointer items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r bg-primary hover:opacity-85 text-white px-6 sm:px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base'>
              <Play className='w-4 h-4 sm:w-5 sm:h-5 fill-white' />
              Explore Now
            </button>
            
            {/* <button className='flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300 font-semibold border border-white/20 hover:border-white/40 text-sm sm:text-base'>
              <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
              My List
            </button> */}
          </div>

          <div className='flex items-center gap-3 sm:gap-4 pt-2'>
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <div className='flex items-center'>
                <span className='text-yellow-400 text-lg sm:text-xl md:text-2xl'>★</span>
              </div>
              <span className='text-white font-semibold text-base sm:text-lg md:text-xl'>8.5</span>
              <span className='text-white/60 text-xs sm:text-sm'>/10</span>
            </div>
            
            <div className='h-4 sm:h-6 w-px bg-white/20'></div>
            
            <span className='text-white/60 text-xs sm:text-sm'>IMDb Rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection