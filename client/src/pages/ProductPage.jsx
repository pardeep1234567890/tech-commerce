import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
    const { id: productId } = useParams(); // Get the 'id' from the URL

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); // Ensure loading is true on new ID
                const res = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]); // <-- IMPORTANT: Rerun this effect if the 'productId' changes

    // --- Render states ---
    if (loading) {
        return <div className="p-8 text-center dark:text-gray-400">Loading product...</div>;
    }
    if (error) {
        return <div className="p-8 text-center text-red-500 dark:text-red-400">Error: {error}</div>;
    }
    if (!product) {
        return <div className="p-8 text-center dark:text-gray-400">Product not found.</div>;
    }

    // --- Main Product Display ---
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* Back link */}
            <Link
                to="/shop"
                className="mb-8 flex items-center text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
                <ChevronLeft size={20} className="mr-1" />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
                {/* Left Col: Image */}
                <div className="w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Right Col: Info */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold uppercase tracking-widest text-black dark:text-white">
                        {product.name}
                    </h1>

                    <p className="mt-2 text-3xl tracking-tight text-black dark:text-white">
                        ${product.price.toFixed(2)}
                    </p>

                    {/* Reviews (Placeholder) */}
                    <div className="mt-4 flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <Star
                                    key={rating}
                                    size={20}
                                    className={product.rating > rating ? 'text-black dark:text-white' : 'text-gray-300 dark:text-gray-600'}
                                    fill="currentColor"
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            ({product.numReviews} reviews)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-base text-gray-700 dark:text-gray-300">
                        {product.description}
                    </p>

                    {/* Options (e.g., Size) - UI Only for now */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-black dark:text-white">Size</h3>
                        <select
                            id="size"
                            name="size"
                            className="mt-2 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-2 pl-3 pr-10 text-base focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm"
                        >
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>X-Large</option>
                        </select>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black dark:bg-white px-8 py-3 text-base font-medium text-white dark:text-black transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;