import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, LogOut, UserCircle, Sun, Moon, Heart, Shield, Package, ClipboardList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
// We need to add state to hold the search term and a function to handle the submit.

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart, clearCart } = useCart();
  const [keyword, setKeyword] = useState("");
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme()

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  }
  const handleTheme = () => {
    toggleTheme();
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

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
            {auth && auth.isAdmin && (
              <div className="relative group flex items-center">
                <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                  <Shield size={14} />
                  Admin
                </button>
                {/* Dropdown Menu and it will be Shows on Hover */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 py-2 shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 -translate-y-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin Panel</p>
                  </div>
                  <Link 
                    to="/admin/products" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
                  >
                    <Package size={18} />
                    <span>Manage Products</span>
                  </Link>
                  <Link 
                    to="/admin/orders" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
                  >
                    <ClipboardList size={18} />
                    <span>Manage Orders</span>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={submitHandler} className="hidden md:flex">
              <input
                type="text"
                title="search bar"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="rounded-l-md border border-gray-300 p-2 text-sm text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                title="search"
                className="rounded-r-md bg-black p-2 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <Search size={20} />
              </button>
            </form>
            
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {auth && !auth.isAdmin && (
                <button
                  onClick={toggleCart}
                  title="Shopping Cart"
                  className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <ShoppingBag size={20} />
                  <span className="ml-1 text-sm font-medium">({totalItems})</span>
                </button>
              )}
              <button
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                className="flex items-center text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              {auth && !auth.isAdmin && (
                <>
                  <Link to="/myorders" title="My Orders">
                    <Package size={20} className="text-gray-600 dark:text-gray-400" />
                  </Link>
                  <Link to="/wishlist" title="Wishlist">
                    <Heart size={20} className="text-gray-600 dark:text-gray-400"></Heart>
                  </Link>
                </>
              )}

              {auth ?
                (<div className="flex items-center space-x-2">
                  <UserCircle size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-black dark:text-white mr-2">
                    Hi, {auth.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>) :
                <Link to="/login" title="Login" className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  <UserCircle size={20} className="mr-1" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              }
            </div>

            {/* Mobile Icons - Only essential ones */}
            <div className="flex md:hidden items-center space-x-3">
              {auth && !auth.isAdmin && (
                <button
                  onClick={toggleCart}
                  title="Shopping Cart"
                  className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="ml-1 text-xs font-medium">({totalItems})</span>
                  )}
                </button>
              )}
              <button
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

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

      {/* Mobile Search Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <form onSubmit={submitHandler} className="flex w-full">
            <input
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              placeholder="Search for products..."
              className="flex-1 rounded-l-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-md bg-black px-4 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 md:hidden">
          <nav className="flex flex-col space-y-1 p-4">
            {/* User Info Section */}
            {auth && (
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                <UserCircle size={24} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-black dark:text-white">
                  Hi, {auth.name}
                </span>
              </div>
            )}

            {/* Navigation Links */}
            <Link 
              to="/shop" 
              className="py-2 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/new" 
              className="py-2 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* User-specific links */}
            {auth && !auth.isAdmin && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link 
                  to="/myorders" 
                  className="flex items-center gap-2 py-2 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package size={18} />
                  My Orders
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center gap-2 py-2 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
              </>
            )}

            {/* Admin links */}
            {auth && auth.isAdmin && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="py-1">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Admin Panel</p>
                  <Link 
                    to="/admin/products" 
                    className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package size={18} />
                    Manage Products
                  </Link>
                  <Link 
                    to="/admin/orders" 
                    className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ClipboardList size={18} />
                    Manage Orders
                  </Link>
                </div>
              </>
            )}

            {/* Auth Actions */}
            {auth ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;