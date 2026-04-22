import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, LogOut, UserCircle, Sun, Moon, Heart, Shield, Package, ClipboardList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart, clearCart } = useCart();
  const [keyword, setKeyword] = useState("");
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };

  const handleTheme = () => {
    toggleTheme();
  };

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 dark:bg-gray-900/90 dark:border-gray-700 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-2xl font-bold uppercase tracking-widest text-black dark:text-white font-display hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              AURA
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden space-x-8 md:flex">
            {['Shop', 'New', 'About'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="group relative text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black dark:bg-white transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            {auth && auth.isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group flex items-center"
              >
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                  <Shield size={14} />
                  Admin
                </button>
                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 py-2 shadow-soft-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                >
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Admin Panel
                    </p>
                  </div>
                  <Link
                    to="/admin/products"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Package size={18} />
                    <span>Manage Products</span>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <ClipboardList size={18} />
                    <span>Manage Orders</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={submitHandler}
              className="hidden md:flex"
            >
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="rounded-l-xl border border-gray-300 p-2.5 text-sm text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="rounded-r-xl bg-black p-2.5 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Search size={20} />
              </motion.button>
            </motion.form>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              {auth && !auth.isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCart}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTheme}
                className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>

              {auth && !auth.isAdmin && (
                <div className="flex items-center space-x-2">
                  <Link to="/myorders" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    <Package size={20} />
                  </Link>
                  <Link to="/wishlist" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    <Heart size={20} />
                  </Link>
                </div>
              )}

              {auth ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2"
                >
                  <UserCircle size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-black dark:text-white">
                    Hi, {auth.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <UserCircle size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center space-x-3">
              {auth && !auth.isAdmin && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCart}
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <ShoppingBag size={20} />
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleTheme}
                className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 md:hidden overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <form onSubmit={submitHandler} className="flex w-full">
            <input
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              placeholder="Search for products..."
              className="flex-1 rounded-l-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="rounded-r-xl bg-black px-4 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Search size={20} />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0.5
        }}
        className="border-t border-gray-200 dark:border-gray-700 md:hidden overflow-hidden"
      >
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col space-y-1 p-4"
          >
            {auth && (
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                <UserCircle size={24} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-black dark:text-white">
                  Hi, {auth.name}
                </span>
              </div>
            )}

            {['Shop', 'New', 'About'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}

            {auth && !auth.isAdmin && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                <Link
                  to="/myorders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <Package size={18} />
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
              </>
            )}

            {auth && auth.isAdmin && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Admin Panel
                </p>
                <Link
                  to="/admin/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  <Package size={18} />
                  Manage Products
                </Link>
                <Link
                  to="/admin/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  <ClipboardList size={18} />
                  Manage Orders
                </Link>
              </>
            )}

            {auth ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <UserCircle size={18} />
                  Login
                </Link>
              </>
            )}
          </motion.nav>
        )}
      </motion.div>
    </motion.header>
  );
};

export default Header;
