import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {keyword} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products?keyword=${keyword}`);
        const data = res.data;
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

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
              {/* These are just placeholders for now */}
              <li><a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Hoodies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">T-Shirts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Pants</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Footwear</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Accessories</a></li>
            </ul>
          </aside>

          {/* --- Product Grid --- */}
          <div className="lg:col-span-3">
            {loading && <Loading text="Loading products..." />}
            {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
            
            {!loading && !error && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;