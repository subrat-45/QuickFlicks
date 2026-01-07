import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Clock, Play, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full min-h-screen flex items-end bg-[url("/backgroundImage.png")] bg-cover bg-center bg-no-repeat'>
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'></div>
      
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20'>
        <div className='max-w-3xl space-y-6 md:space-y-4'>
          <img 
            src={assets.marvelLogo} 
            alt="Marvel Logo" 
            className='w-32 md:w-40 lg:w-48 mb-4 md:mb-6'
          />
          
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight'>
            Guardians <br /> of the Galaxy
          </h1>
          
          <div className='flex flex-wrap items-center gap-3 md:gap-6 text-white/90'>
            <span className='text-sm md:text-base lg:text-lg font-medium'>
              Action • Adventure • Sci-fi
            </span>
            
            <div className='flex items-center gap-2 text-sm md:text-base'>
              <Calendar className='w-4 h-4 md:w-5 md:h-5' />
              <span>2008</span>
            </div>
            
            <div className='flex items-center gap-2 text-sm md:text-base'>
              <Clock className='w-4 h-4 md:w-5 md:h-5' />
              <span>2h 6min</span>
            </div>
          </div>

          <p className='text-white/80 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed'>
            After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil and protect the world as Iron Man.
          </p>

          <div className='flex flex-wrap items-center gap-4 pt-4'>
            <button onClick={() => {navigate('/movies'); scrollTo(0,0)}} className='flex cursor-pointer items-center gap-3 bg-gradient-to-r bg-primary hover:opacity-85 text-white px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105'>
              <Play className='w-5 h-5 fill-white' />
              Explore Now
            </button>
            
            {/* <button className='flex items-center gap-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300 font-semibold border border-white/20 hover:border-white/40'>
              <Plus className='w-5 h-5' />
              My List
            </button> */}
          </div>

          <div className='flex items-center gap-4 pt-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <span className='text-yellow-400 text-xl md:text-2xl'>★</span>
              </div>
              <span className='text-white font-semibold text-lg md:text-xl'>8.5</span>
              <span className='text-white/60 text-sm'>/10</span>
            </div>
            
            <div className='h-6 w-px bg-white/20'></div>
            
            <span className='text-white/60 text-sm'>IMDb Rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection