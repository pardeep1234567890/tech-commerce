import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // We need this to get the token!
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { auth } = useAuth(); // Get the logged-in user's info

    // Fetch wishlist from backend
    const fetchWishlist = async () => {
        if (!auth) {
            setWishlist([]);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            };

            const { data } = await axios.get(`${BACKEND_URL}/api/users/wishlist`, config);
            // Backend returns populated products, we need just the IDs
            const wishlistIds = Array.isArray(data) 
                ? data.map(product => product._id || product) 
                : [];
            setWishlist(wishlistIds);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            setWishlist([]);
        }
    };

    // Load wishlist when auth changes
    useEffect(() => {
        fetchWishlist();
    }, [auth]);

    // Check if an item is wishlisted (just checks the local array)
    const isWishlisted = (productId) => {
        return wishlist.includes(productId);
    };

    // The BIG function: This talks to the backend
    const toggleWishlist = async (productId) => {
        if (!auth) {
            toast.error('You must be logged in to add to wishlist');
            return;
        }

        try {
            // Create the 'config' object to send the token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`, // This is the "ID card"
                },
            };

            // Send the productId and the token
            const { data } = await axios.post(
                `${BACKEND_URL}/api/users/wishlist`,
                { productId }, // The data we are sending
                config           // The auth headers
            );

            // The server will send back the *new* wishlist array
            // We update our local state to match the database
            setWishlist(data.wishlist);

            // Check if the item was added or removed
            if (data.wishlist.includes(productId)) {
                toast.success('Added to wishlist!');
            } else {
                toast.info('Removed from wishlist.');
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    };

    const value = {
        wishlist,
        setWishlist, // We'll use this on login
        isWishlisted,
        toggleWishlist,
        fetchWishlist, // Export this in case we need to manually refresh
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};