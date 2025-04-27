import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { Search, Menu, X, ShoppingBag, MessageSquare, User } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-teal-400" />
            <span className="font-bold text-xl">FleaChain</span>
          </Link>
          
          {/* Desktop search bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/marketplace" className="px-3 py-2 hover:text-teal-300">Marketplace</Link>
            
            {currentUser ? (
              <>
                <Link to="/messages" className="px-3 py-2 hover:text-teal-300">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <Avatar 
                      src={currentUser.avatar} 
                      fallback={currentUser.username} 
                      size="sm" 
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/my-listings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Listings
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <Link to="/create-listing">
                  <Button size="sm">List Item</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-blue-800">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 flex items-center text-gray-500 hover:text-gray-700"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link 
              to="/marketplace" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link 
                  to="/my-listings" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>My Listings</span>
                  </div>
                </Link>
                <Link 
                  to="/messages" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </div>
                </Link>
                <Link 
                  to="/orders" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  to="/create-listing" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  List Item
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;