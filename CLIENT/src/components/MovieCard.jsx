import { Star } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat.js'

const MovieCard = ({movie}) => {
    const navigate = useNavigate()
    
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                    src={movie.backdrop_path} 
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80"></div>
                
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-500 px-3 py-1.5 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                    <span className="text-sm font-bold text-slate-900">{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
            
            <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-white line-clamp-1 transition-colors duration-300 group-hover:text-yellow-500">
                    {movie.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="line-clamp-1">{movie.genres.slice(0,2).map(gener => gener.name).join(" | ")}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>{timeFormat(movie.runtime)}</span>
                </div>
                
                <button 
                    onClick={() => {navigate(`/movies/${movie._id}`); scrollTo(0,0)}}
                    className="w-full cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:from-yellow-400 hover:to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 active:scale-95"
                >
                    Buy Tickets
                </button>
            </div>
            
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
        </div>
    )
}

export default MovieCard