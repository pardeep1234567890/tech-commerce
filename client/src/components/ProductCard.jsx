import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { auth } = useAuth();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link to={`/product/${product._id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 lg:aspect-none lg:h-80 shadow-soft group-hover:shadow-soft-lg transition-shadow duration-300">
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-20 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isWishlisted(product._id) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Heart size={20} color="#ef4444" fill="#ef4444" />
              </motion.div>
            ) : (
              <Heart size={20} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
            )}
          </motion.button>

          {/* Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center gap-3"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to={`/product/${product._id}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 text-black dark:text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Eye size={16} />
                Quick View
              </Link>
            </motion.div>
          </motion.div>

          {/* New Badge */}
          {product.stock <= 10 && product.stock > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-3 left-3 z-10 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-md"
            >
              Low Stock
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Category */}
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            {auth && !auth.isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                title="Add to Cart"
              >
                <ShoppingBag size={18} />
              </motion.button>
            )}
          </div>

          {/* Rating */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`w-4 h-4 ${
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.numReviews})
              </span>
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
