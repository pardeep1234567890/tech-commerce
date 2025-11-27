import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { BACKEND_URL } from '../config/api';

const WishlistPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth(); // We need auth to get the token

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${auth.token}`, // Send the "ID Card"
                    },
                };

                const { data } = await axios.get(
                    `${BACKEND_URL}/api/users/wishlist`,
                    config
                );

                setProducts(data);
            } catch (error) {
                console.error("Error fetching wishlist", error);
            } finally {
                setLoading(false);
            }
        };

        if (auth) {
            fetchWishlist();
        } else {
            setLoading(false);
        }
    }, [auth]);

    if (loading) {
        return <Loading fullScreen text="Loading your wishlist..." />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            {products.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    {/* <p className="text-xl text-gray-600 dark:text-gray-400">Your wishlist is empty</p> */}
                    {loading}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;