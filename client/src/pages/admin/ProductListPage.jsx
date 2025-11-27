import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ProductCreateModal from '../../components/ProductCreateModal';
import { BACKEND_URL } from '../../config/api';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    // We can just reuse the public API to get the list!
    const { data } = await axios.get(`${BACKEND_URL}/api/products`);
    setProducts(data);
  };

  const handleProductCreated = (newProduct) => {
    // Refresh the product list after creation
    fetchProducts();
    // Optionally navigate to edit page
    navigate(`/admin/product/${newProduct._id}/edit`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
            headers: { Authorization: `Bearer ${auth.token}` } // Send token
        };
        await axios.delete(`${BACKEND_URL}/api/products/${id}`, config);
        
        toast.success('Product Deleted');
        fetchProducts(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
        >
           <Plus size={20} className="mr-1"/> Create Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">NAME</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">PRICE</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">CATEGORY</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">BRAND</th>
              <th className="relative py-3 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:bg-black dark:divide-gray-800">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product._id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-black dark:text-white">{product.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.brand}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <div className="flex items-center justify-end gap-4">
                    <Link 
                      to={`/admin/product/${product._id}/edit`}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
                    >
                      <Edit size={20} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Create Modal */}
      <ProductCreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleProductCreated}
      />
    </div>
  );
};

export default ProductListPage;