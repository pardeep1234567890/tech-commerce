import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-widest text-black">
              AURA
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden space-x-8 md:flex">
            <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              Shop
            </Link>
            <Link to="/new" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              New
            </Link>
            <Link to="/about" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden text-gray-600 hover:text-black md:block">
              <Search size={20} />
            </button>
            <Link to="/login" className="text-gray-600 hover:text-black">
              <User size={20} />
            </Link>
            <button onClick={toggleCart} className="flex items-center text-gray-600 hover:text-black">
              <ShoppingBag size={20} />
              <span className="ml-1 text-sm font-medium">({totalItems})</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="text-gray-600 hover:text-black md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              Shop
            </Link>
            <Link to="/new" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              New
            </Link>
            <Link to="/about" className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-black">
              About
            </Link>
            <button className="flex items-center text-gray-600 hover:text-black">
              <Search size={20} className="mr-2" /> Search
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;