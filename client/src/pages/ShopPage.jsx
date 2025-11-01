import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
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
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-baseline justify-between border-b border-gray-200 pb-6 md:flex-row">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-black">
          Shop
        </h1>
        {/* We can add a sort dropdown here later */}
      </div>

      <section className="pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* --- Filter Sidebar --- */}
          <aside className="hidden lg:block">
            <h3 className="text-lg font-medium tracking-wide text-black">
              Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {/* These are just placeholders for now */}
              <li><a href="#" className="text-gray-600 hover:text-black">Hoodies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">T-Shirts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Pants</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Footwear</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Accessories</a></li>
            </ul>
          </aside>

          {/* --- Product Grid --- */}
          <div className="lg:col-span-3">
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            
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

export default ShopPage;