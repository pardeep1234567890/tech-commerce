import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
  // No more types in useState!
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);  //Here we set the data into the products variable  
      } catch (err) { // Simpler catch block
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />

      {/* Featured Products Section */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-black dark:text-white">
          Featured
        </h2>

        {/* Loading and Error states */}
        {loading && <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>}
        {error && <p className="mt-4 text-red-500 dark:text-red-400">Error: {error}</p>}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;