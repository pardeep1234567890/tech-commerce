import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton, HeroSkeleton } from '../components/Skeleton';
import AboutPage from './AboutPage';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {loading ? <HeroSkeleton /> : <Hero />}

      {/* Featured Products Section */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-black dark:text-white">
          Featured
        </h2>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </div>
      <AboutPage />
    </div>
  );
};

export default Homepage;
