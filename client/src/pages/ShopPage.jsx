import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products`);
        const data = res.data;
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-baseline justify-between border-b border-gray-200 dark:border-gray-700 pb-6 md:flex-row"
      >
        <h1 className="text-4xl font-bold uppercase tracking-widest text-black dark:text-white font-display">
          Shop All
        </h1>
        <p className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          Discover our latest collection
        </p>
      </motion.div>

      <section className="pt-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filter Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <h3 className="text-lg font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <motion.li
                  key={category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Filter Info */}
            <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Not sure about your size? Check out our{' '}
                <a href="/about" className="text-primary-600 dark:text-primary-400 hover:underline">
                  size guide
                </a>
              </p>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {!loading && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> products
                </p>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}

            <motion.div
              layout
              className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : filteredProducts.length > 0
                ? filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-16"
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                      No products found in this category.
                    </p>
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      View all products
                    </button>
                  </motion.div>
                )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ShopPage;
