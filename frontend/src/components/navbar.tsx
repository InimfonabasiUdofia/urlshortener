// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, BarChart3, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <LinkIcon className="h-8 w-8" />
            <Link to="/" className="text-2xl font-bold tracking-tight">
              URLShort
            </Link>
            <span className="hidden md:inline text-sm bg-primary-500 px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
          
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-primary-200 transition-colors"
            >
              <LinkIcon className="h-5 w-5" />
              <span>Shorten</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 hover:text-primary-200 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <button className="flex items-center space-x-1 hover:text-primary-200 transition-colors">
              <User className="h-5 w-5" />
              <span>Login</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;