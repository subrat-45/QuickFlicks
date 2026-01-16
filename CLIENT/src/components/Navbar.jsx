import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, Search, TicketPlus, X, Mail, Lock, User, Eye, EyeOff, Film, Ticket, Star, Clock, LogOut } from "lucide-react"

// Auth Modal Component with Split Screen Design
const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return false
    }
    
    if (!isLogin) {
      if (!formData.name) {
        setError('Please enter your name')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError('')
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      
      // Store token and user data in memory/context instead of localStorage
      // You should use Context API or state management for this
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      
      onClose()
      window.location.reload()
      
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = '/api/auth/google'
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setError('')
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[90vh] sm:h-[600px] transform transition-all duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer -top-2 -right-2 sm:-top-4 sm:-right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row">
          
          {/* Promotional Content */}
          <div className={`absolute top-0 h-full w-full md:w-1/2 bg-primary transition-all duration-700 ease-in-out overflow-hidden ${
            isLogin 
              ? 'left-0 md:left-0 rounded-tl-xl sm:rounded-tl-2xl md:rounded-l-2xl md:rounded-r-full' 
              : 'left-0 md:left-1/2 rounded-tr-xl sm:rounded-tr-2xl md:rounded-r-2xl md:rounded-l-full'
          }`}>
            <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-8 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>

              <div className="relative z-10 text-center space-y-3 sm:space-y-6 hidden md:block">
                {isLogin ? (
                  <>
                    <div className="mb-4">
                      <Ticket className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 animate-bounce" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">New Here?</h2>
                    <p className="text-sm sm:text-lg mb-4 sm:mb-6 text-white/90 px-4">
                      Join thousands of movie lovers! Create your account and start booking amazing experiences.
                    </p>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Exclusive movie deals</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Easy ticket booking</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Quick seat selection</span>
                      </div>
                    </div>
                    <button
                      onClick={switchMode}
                      className="bg-white cursor-pointer text-primary px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <Film className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 animate-bounce" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Welcome Back!</h2>
                    <p className="text-sm sm:text-lg mb-4 sm:mb-6 text-white/90 px-4">
                      Ready for your next movie adventure? Sign in to continue where you left off.
                    </p>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Access your favorites</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>View booking history</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 justify-center text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Save time on checkout</span>
                      </div>
                    </div>
                    <button
                      onClick={switchMode}
                      className="bg-white cursor-pointer text-primary red-700 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={`absolute top-0 h-full w-full md:w-1/2 bg-black transition-all duration-700 ease-in-out ${
            isLogin ? 'left-0 md:left-1/2' : 'left-0 md:left-0'
          }`}>
            <div className="h-full overflow-y-auto p-2 sm:p-6 md:p-10 flex flex-col justify-center">
              <div className="text-center mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  {isLogin ? 'Enter your credentials to continue' : 'Fill in your details to get started'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required={!isLogin}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>

                {/* {!isLogin && (
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required={!isLogin}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                )} */}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-xs sm:text-sm text-red-600 hover:text-red-500 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-primary hover:bg-primary-dull disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>

                <div className="relative my-4 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-4 bg-black text-gray-400">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full cursor-pointer flex items-center justify-center gap-3 py-2.5 sm:py-3 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all duration-300 hover:scale-105"
                >
                  <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png" alt="" className='rounded-full' height={'20px'}  width={'20px'}/>
                  <span className="text-sm sm:text-base">Continue with Google</span>
                </button>

                <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = sessionStorage.getItem('token')
    const userData = sessionStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignIn = () => {
    setIsAuthOpen(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <>
      <nav className='w-full fixed top-0 left-0 z-50'>
        <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            
            <Link to='/' className='flex-shrink-0 z-50 flex items-center py-4'>
              <img src={assets.logo} alt="Website Logo" className='h-24 w-auto object-contain' />
            </Link>

            <div className='hidden md:flex items-center backdrop-blur-xl bg-white/10 rounded-full px-6 py-2.5 border border-white/20 shadow-lg gap-1 hover:scale-101 duration-300'>
              <Link to='/' onClick={scrollTo(0, 0)} className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
                Home
              </Link>
              <Link to='/movies' onClick={scrollTo(0, 0)} className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
                Movies
              </Link>
              <Link to='/releases' onClick={scrollTo(0, 0)} className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
                Releases
              </Link>
              <Link to='/favorites' onClick={scrollTo(0, 0)} className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
                Favorites
              </Link>
              <Link to='/my-booking' onClick={scrollTo(0, 0)} className='text-white hover:text-red-400 transition-all duration-300 font-medium px-5 py-2 rounded-full hover:bg-white/10'>
                My Bookings
              </Link>
            </div>

            <div className='hidden md:flex items-center gap-3 flex-shrink-0'>
              <button className='text-white cursor-pointer hover:text-red-400 transition-all duration-300 p-2.5 rounded-full hover:bg-white/10 backdrop-blur-sm'>
                <Search className='w-5 h-5' />
              </button>
              {
                user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 border border-white/20"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            navigate('/my-booking')
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <TicketPlus className="w-5 h-5" />
                          <span>My Bookings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/10 transition-all duration-300 border-t border-white/10"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={handleSignIn} 
                    className='bg-primary cursor-pointer hover:bg-primary-dull text-white px-7 py-2.5 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105'
                  >
                    Sign in
                  </button>
                )
              }
            </div>

            <button 
              onClick={toggleMenu}
              className='md:hidden cursor-pointer text-white z-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-300'
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
            <Link 
              to='/my-booking' 
              onClick={toggleMenu}
              className='text-white text-2xl hover:text-red-400 transition-all duration-300 font-medium px-8 py-3 rounded-full hover:bg-white/10'
            >
              My Bookings
            </Link>
            
            <div className='flex flex-col items-center gap-4 mt-8'>
              {user ? (
                <>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      toggleMenu()
                      handleLogout()
                    }}
                    className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full transition-all duration-300 font-medium shadow-lg hover:scale-105'
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    toggleMenu()
                    handleSignIn()
                  }}
                  className='bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-3 rounded-full transition-all duration-300 font-medium shadow-lg hover:scale-105'
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Custom Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}

export default Navbar