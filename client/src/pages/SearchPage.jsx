import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const {keyword} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setSelectedCategory('All');
        const res = await axios.get(`${BACKEND_URL}/api/products?keyword=${keyword}`);
        const data = res.data;
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-baseline justify-between border-b border-gray-200 dark:border-gray-700 pb-6 md:flex-row">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-black dark:text-white">
          {`Search Results for: ${keyword}`}
        </h1>
        {/* We can add a sort dropdown here later */}
      </div>

      <section className="pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* --- Filter Sidebar --- */}
          <aside className="hidden lg:block">
            <h3 className="text-lg font-medium tracking-wide text-black dark:text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* --- Product Grid --- */}
          <div className="lg:col-span-3">
            {loading && <Loading text="Loading products..." />}
            {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
            
            {!loading && !error && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                      No products found for this search or category.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;