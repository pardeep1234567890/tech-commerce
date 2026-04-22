import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, ZoomIn, Minus, Plus, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { auth } = useAuth();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
        const data = res.data;
        setProduct(data);

        // Fetch related products (same category, excluding current)
        const allProductsRes = await axios.get(`${BACKEND_URL}/api/products`);
        const related = allProductsRes.data
          .filter(p => p.category === data.category && p._id !== data._id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const productWithSize = { ...product, selectedSize, quantity };
    addToCart(productWithSize);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loading fullScreen text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">Error: {error}</p>
          <Link to="/shop" className="text-primary-600 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Shop
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div
              className={`relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-soft-lg cursor-zoom-in ${isZoomed ? 'fixed inset-4 z-50 bg-black/95 cursor-zoom-out' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                whileHover={{ scale: isZoomed ? 1 : 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Zoom Indicator */}
              {!isZoomed && (
                <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-md">
                  <ZoomIn size={20} className="text-gray-600 dark:text-gray-300" />
                </div>
              )}

              {/* Close button when zoomed */}
              {isZoomed && (
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Image hint */}
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              Click image to zoom
            </p>
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Category & Title */}
            <div className="mb-4">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold uppercase tracking-widest text-gray-900 dark:text-white font-display">
                {product.name}
              </h1>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      size={18}
                      className={product.rating > rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.numReviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Select Size
                </h3>
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium uppercase tracking-widest rounded-lg transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-soft hover:shadow-soft-lg'
                }`}
              >
                <ShoppingBag size={20} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistToggle}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isWishlisted(product._id)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <Heart
                  size={24}
                  className={isWishlisted(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-300'}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
              >
                <Share2 size={24} className="text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">On orders over ₹5000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Easy Returns</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductPage;
