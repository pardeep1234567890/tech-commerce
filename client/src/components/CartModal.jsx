import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- Listen to the broadcast!
import { X, Plus, Minus, Trash2 } from 'lucide-react';

const CartModal = () => {
    // Get all state and functions from our context
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
    } = useCart();

    // Calculate total
    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty, //acc (accumulator) = The running total so far
        0
    );

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleCart} // Close cart when overlay is clicked
            ></div>

            {/* Cart Modal */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-xl transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
                        <h2 className="text-xl font-bold uppercase tracking-wider">
                            Shopping Cart
                        </h2>
                        <button onClick={toggleCart} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Your cart is empty.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="flex py-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div className="flex justify-between text-base font-medium text-black dark:text-white">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">${(item.price * item.qty).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</p>

                                            {/* Quantity / Remove */}
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center border dark:border-gray-600">
                                                    <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"><Minus size={16} /></button>
                                                    <span className="w-8 text-center">{item.qty}</span>
                                                    <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"><Plus size={16} /></button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t dark:border-gray-700 p-4">
                        <div className="flex justify-between text-lg font-bold text-black dark:text-white">
                            <p>Subtotal</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
                        <Link
                            to="/checkout" // We will build this page later
                            onClick={toggleCart} // Close cart on click
                            className="mt-6 flex w-full items-center justify-center rounded-md bg-black dark:bg-white px-6 py-3 text-base font-medium text-white dark:text-black transition-opacity hover:opacity-80"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartModal;