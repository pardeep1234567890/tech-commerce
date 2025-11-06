import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Heart } from 'lucide-react';

// We just pass { product } directly as a prop
const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { auth } = useAuth();

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent the Link from navigating
    e.stopPropagation(); // Stop the event from bubbling up
    toggleWishlist(product._id); // Pass the product ID
  };

  return (
    <Link to={`/product/${product._id}`} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
        <button onClick={handleWishlistClick} className='absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
        { isWishlisted(product._id)? <Heart size={22} color='red' fill='red'/>:<Heart size={22} className="text-gray-700 dark:text-gray-300" />}
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-black dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-black dark:text-white">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;