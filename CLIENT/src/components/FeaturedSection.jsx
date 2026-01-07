import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from "./BlurCircle"
import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/assets'

const FeaturedSection = () => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20 lg:py-32'>
            <div className='relative w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>Now showing</h2>
                <button className='flex gap-2 items-center cursor-pointer text-white transition-colors group'>
                    <p className='text-sm md:text-base font-medium'>See All</p> 
                    <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-1 duration-300' />
                </button>
                <BlurCircle top='0px' right='-80px'/>
            </div>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                {
                    dummyShowsData.slice(0, 4).map((show) => (
                        <MovieCard key={show.id} movie={show}/>
                    ))
                }
            </div>

            <div className='w-full flex justify-center mt-10 md:mt-16'>
                <button 
                    onClick={() => {window.scrollTo(0,0); navigate('/movies') }} 
                    className='px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95 hover:text-lg'
                >
                    <p>Show More</p>
                </button>
            </div>
            
        </div>
    )
}

export default FeaturedSection