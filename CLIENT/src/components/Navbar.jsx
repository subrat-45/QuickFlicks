import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, Search, TicketPlus, X } from "lucide-react"
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='w-full fixed top-0 left-0 z-50 bg-transparent'>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          <Link to='/' className='flex-shrink-0 z-50 flex items-center py-4'>
            <img src={assets.logo} alt="Website Logo" className='h-24 w-auto object-contain' />
          </Link>

          <div className='hidden md:flex items-center backdrop-blur-xl bg-white/10 rounded-full px-6 py-2.5 border border-white/20 shadow-lg gap-1 hover:scale-101 duration-300'>
            <Link to='/' className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
              Home
            </Link>
            <Link to='/movies' className='text-white hover:text-primary transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
              Movies
            </Link>
            <Link to='/releases' className='text-white hover:text-primary transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
              Releases
            </Link>
            <Link to='/favorites' className='text-white hover:text-primary transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
              Favorites
            </Link>
            <Link to='/my-booking' className='text-white hover:text-primary transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
              My Bookings
            </Link>
          </div>

          <div className='hidden md:flex items-center gap-3 flex-shrink-0'>
            <button className='text-white cursor-pointer hover:text-primary transition-all duration-300 p-2.5 rounded-full hover:bg-white/10 backdrop-blur-sm'>
              <Search className='w-5 h-5' />
            </button>
            {
              user ? (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action label='My Booking' labelIcon={<TicketPlus width={15} onClick={() => {navigate('/my-booking')}}/>}/>
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button onClick={openSignIn} className='bg-gradient-to-r cursor-pointer bg-primary hover:opacity-85 text-white px-7 py-2.5 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105'>
              Sign in
            </button>
              )
            }
          </div>

          <button 
            onClick={toggleMenu}
            className='hidden cursor-pointer max-md:block text-white z-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-300'
          >
            {isMenuOpen ? <X className='w-6 h-6 cursor-pointer' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className='flex flex-col items-center justify-center h-full space-y-6'>
          <Link 
            to='/' 
            onClick={toggleMenu}
            className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
          >
            Home
          </Link>
          <Link 
            to='/movies' 
            onClick={toggleMenu}
            className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
          >
            Movies
          </Link>
          <Link 
            to='/theaters' 
            onClick={toggleMenu}
            className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
          >
            Theaters
          </Link>
          <Link 
            to='/releases' 
            onClick={toggleMenu}
            className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
          >
            Releases
          </Link>
          <Link 
            to='/favorites' 
            onClick={toggleMenu}
            className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
          >
            Favorites
          </Link>
          
          <div className='flex flex-col items-center gap-4 mt-8'>
            <button className='bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-3 rounded-full transition-all duration-300 font-medium shadow-lg hover:scale-105'>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar