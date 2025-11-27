import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config/api';

const ProductCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const { auth } = useAuth();
  
  // Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // For category and brand suggestions
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Fetch existing categories and brands for suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products`);
        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        const uniqueBrands = [...new Set(data.map(p => p.brand).filter(Boolean))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    };
    
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setImageFile(null);
    setImagePreview('');
    setBrand('');
    setCategory('');
    setCountInStock('');
    setDescription('');
    setErrors({});
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImage(url);
    setImagePreview(url);
    setImageFile(null); // Clear file if URL is entered
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      await uploadImageToCloudinary(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/upload`,
        formData,
        config
      );

      setImage(data.url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
      setImageFile(null);
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!price || price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!brand.trim()) newErrors.brand = 'Brand is required';
    if (countInStock === '' || countInStock < 0) newErrors.countInStock = 'Stock count must be 0 or greater';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/products`,
        {
          name,
          price: Number(price),
          image,
          brand,
          category,
          countInStock: Number(countInStock),
          description,
        },
        config
      );

      toast.success('Product created successfully!');
      onSuccess(data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(category.toLowerCase())
  );

  const filteredBrands = brands.filter(b =>
    b.toLowerCase().includes(brand.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-gray-900 shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Create New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="px-6 py-6 space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Price and Stock - Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className={`w-full rounded-md border ${errors.countInStock ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
                placeholder="0"
              />
              {errors.countInStock && <p className="mt-1 text-xs text-red-500">{errors.countInStock}</p>}
            </div>
          </div>

          {/* Category with Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setShowCategorySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 200)}
              className={`w-full rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
              placeholder="e.g., Electronics, Clothing"
            />
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            
            {/* Category Suggestions */}
            {showCategorySuggestions && filteredCategories.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700">
                {filteredCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCategory(cat);
                      setShowCategorySuggestions(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand with Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              onFocus={() => setShowBrandSuggestions(true)}
              onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
              className={`w-full rounded-md border ${errors.brand ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
              placeholder="e.g., Apple, Nike"
            />
            {errors.brand && <p className="mt-1 text-xs text-red-500">{errors.brand}</p>}
            
            {/* Brand Suggestions */}
            {showBrandSuggestions && filteredBrands.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700">
                {filteredBrands.map((b, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setBrand(b);
                      setShowBrandSuggestions(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {b}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Image <span className="text-red-500">*</span>
            </label>
            
            {/* File Upload Button */}
            <div className="mb-3">
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition-colors bg-gray-50 dark:bg-gray-800">
                <Upload size={20} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {uploading ? 'Uploading...' : imageFile ? imageFile.name : 'Click to upload image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {/* OR divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">OR</span>
              </div>
            </div>

            {/* Image URL Input */}
            <input
              type="text"
              value={image}
              onChange={handleImageChange}
              className={`w-full rounded-md border ${errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Or paste image URL"
              disabled={uploading}
            />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3 relative">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 rounded-md object-contain"
                    onError={() => {
                      setImagePreview('');
                      toast.error('Invalid image URL');
                    }}
                  />
                </div>
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="text-white text-sm font-medium">Uploading...</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} p-2.5 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Enter product description..."
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreateModal;
