import  { useState } from 'react';
import { Menu, X,  LogIn, LogOut } from 'lucide-react';

export default function Navbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change based on your auth state



  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };

  const handleLogin = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    <>
    <nav 
      className='fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-500 '
    >
      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5   animate-pulse" 
           style={{ backgroundSize: '200% 100%' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a href="/" className="shrink-0 group cursor-pointer">
            <div className="flex items-center space-x-3">
             
              <span className="text-xl font-bold text-white ">
                UrlShortener
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="/"
              className="flex items-center text-xl space-x-2 px-4 py-2 hover:text-gray-300 text-white transition-all duration-200 group relative rounded-lg"
            >
             
              <span>Home</span>
              <span className="absolute inset-0    rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {!isLoggedIn && (
              <a
                href="/history"
                className="flex items-center space-x-2 px-4 py-2 text-xl hover:cursor-pointer hover:text-gray-300  text-white transition-all duration-200 group relative rounded-lg"
              >
               
                <span>History</span>
                <span className="absolute inset-0    rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            )}
          </div>

          {/* Auth Button - Desktop */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-2 text-black  hover:cursor-pointer transition-colors duration-200 font-medium group"
              >
                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="relative px-6 py-2.5 font-semibold text-black hover:cursor-pointer overflow-hidden rounded-lg group"
              >
                <div className="absolute inset-0 bg-white transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 b opacity-50 group-hover:opacity-75 transition-opacity" />
                <span className="relative z-10 flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-violet-500/10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-black-500 border-violet-500/20">
          <a
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:cursor-pointer rounded-lg transition-all duration-200"
          >
           
            <span className="font-medium">Home</span>
          </a>

          {!isLoggedIn && (
            <a
              href="/history"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:cursor-pointer rounded-lg transition-all duration-200"
            >
              
              <span className="font-medium">History</span>
            </a>
          )}

          <div className="pt-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg transition-all duration-200 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 font-semibold  bg-white text-black rounded-lg hover:shadow-lg hover:cursor-pointer transition-all duration-200"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>

     
        
       
    </>
  );
}