import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider (a component that will wrap our app)
export const CartProvider = ({ children }) => {
    // 3. State
    // We get the initial state from localStorage, or an empty array
    const getInitialCart = () => {
        try {
            const saved = localStorage.getItem('auraCart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Could not parse cart data:', error);
            return [];
        }
    };

    const [cartItems, setCartItems] = useState(getInitialCart());
    // const [cartItems, setCartItems] = useState(() => {
    //     try {
    //         const localData = localStorage.getItem('auraCart');
    //         return localData ? JSON.parse(localData) : [];
    //     } catch (error) {
    //         console.error('Could not parse cart data:', error);
    //         return [];
    //     }
    // });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // 4. Save to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('auraCart', JSON.stringify(cartItems));  // Here auraCart is key name for storing the cart data 
    }, [cartItems]);

    // 5. Helper Functions (The "Logic")
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Check if the item (and specific size) is already in the cart
            const existingItem = prevItems.find((item) => item._id === product._id);

            if (existingItem) {
                // If it exists, map over and increase quantity
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                // If it's new, add it to the cart with quantity 1
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
        // Open the cart modal when an item is added
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== productId)
        );
    };

    const updateQuantity = (productId, newQty) => {
        if (newQty <= 0) {
            // If qty is 0 or less, remove it
            removeFromCart(productId);
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === productId ? { ...item, qty: newQty } : item
                )
            );
        }
    };

    // 6. Value to be "broadcast"
    const value = {
        cartItems,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
    };

    // 7. Return the Provider
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};

// 8. Create a custom hook for easy access
export const useCart = () => {
    return useContext(CartContext);
};