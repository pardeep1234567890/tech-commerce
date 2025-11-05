import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // We need this to get the token!
import { toast } from 'react-toastify';

const WishlistContext = createContext();

const API_URL = "http://localhost:3000"; // Or your port

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { auth } = useAuth(); // Get the logged-in user's info

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
                `${API_URL}/api/users/wishlist`,
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