import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
const NewPage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        const allProducts = res.data;

        const thirtyDaysAgo = new Date(); // creates a date object with today's date
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); 

        // 2. Filter the products
        const filteredProducts = allProducts.filter((product) => {
          const productDate = new Date(product.createdAt);  //createdAt is taken from the MongoDB
          return productDate > thirtyDaysAgo;
        });

        setNewProducts(filteredProducts);
      } catch (err) {
            setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);


  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold uppercase tracking-widest text-black dark:text-white">
        New Arrivals
      </h1>
      {/* <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Products added in the last 30 days.
      </p> */}

      {/* Add your loading, error, and grid here */}
      {/* ... */}

      {/* If no new products... */}
      {!loading && newProducts.length === 0 && (
         <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
           {/* No new arrivals. Check back soon! */}
           New arrivals will be soon!
         </p>
      )}

      {/* If there are products... */}
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {newProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewPage;