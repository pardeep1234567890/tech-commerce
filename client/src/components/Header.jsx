import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, LogOut, UserCircle, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme()

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const handleLogout = () => {
    logout()
    navigate("/");
  }
  const handleTheme = () => {
    toggleTheme();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 bg-opacity-90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-widest text-black dark:text-white">
              AURA
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden space-x-8 md:flex">
            <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              Shop
            </Link>
            <Link to="/new" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              New
            </Link>
            <Link to="/about" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white md:block">
              <Search size={20} />
            </button>
            <button onClick={toggleCart} className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              <ShoppingBag size={20} />
              <span className="ml-1 text-sm font-medium">({totalItems})</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {auth ?
              (<div className="flex items-center space-x-2">
                <UserCircle size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-black dark:text-white mr-2">
                  Hi, {auth.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>) :
              <Link to="/login" className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                <UserCircle size={20} className="mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            }

            {/* Mobile Menu Button */}
            {/* <button onClick={handleTheme} className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              {theme === "light" ? <Moon /> : <Sun />}
            </button> */}

            {/* Mobile Menu Button */}
            <button
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              Shop
            </Link>
            <Link to="/new" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              New
            </Link>
            <Link to="/about" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
            <button className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              <Search size={20} className="mr-2" /> Search
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;