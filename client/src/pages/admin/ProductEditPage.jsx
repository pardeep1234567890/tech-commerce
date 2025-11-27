import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import { BACKEND_URL } from '../../config/api';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  // Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      await axios.put(
        `${BACKEND_URL}/api/products/${productId}`,
        {
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        },
        config
      );

      toast.success('Product Updated');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link to="/admin/products" className="flex items-center text-gray-600 hover:text-black mb-6">
        <ChevronLeft size={20} /> Go Back
      </Link>

      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Edit Product</h1>

      <form onSubmit={submitHandler} className="space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Count In Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Count In Stock</label>
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;