import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartModal = () => {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={toggleCart}
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-soft-lg"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-5"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={24} className="text-black dark:text-white" />
                    <h2 className="text-xl font-bold uppercase tracking-wider text-black dark:text-white">
                      Your Cart
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleCart}
                    className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </motion.div>

                {/* Cart Items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex-grow overflow-y-auto p-5"
                >
                  <AnimatePresence>
                    {cartItems.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex h-full flex-col items-center justify-center text-center"
                      >
                        <ShoppingBag size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                          Your cart is empty
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                          Looks like you haven't added anything yet.
                        </p>
                        <Link
                          to="/shop"
                          onClick={toggleCart}
                          className="mt-6 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Start Shopping
                        </Link>
                      </motion.div>
                    ) : (
                      <ul className="space-y-4">
                        {cartItems.map((item, index) => (
                          <motion.li
                            key={item._id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                            />
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between">
                                <h3 className="text-sm font-medium text-black dark:text-white line-clamp-1">
                                  {item.name}
                                </h3>
                                <p className="ml-4 text-sm font-bold text-black dark:text-white">
                                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                                </p>
                              </div>
                              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                ₹{item.price.toLocaleString('en-IN')} each
                              </p>
                              {item.selectedSize && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  Size: {item.selectedSize}
                                </p>
                              )}

                              <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item._id, item.qty - 1)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    <Minus size={14} />
                                  </motion.button>
                                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                                    {item.qty}
                                  </span>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item._id, item.qty + 1)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    <Plus size={14} />
                                  </motion.button>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeFromCart(item._id)}
                                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border-t border-gray-200 dark:border-gray-700 p-5"
                  >
                    <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <p>Subtotal</p>
                      <p>₹{cartTotal.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-black dark:text-white mb-2">
                      <p>Total</p>
                      <p>₹{cartTotal.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <Link
                      to="/checkout"
                      onClick={toggleCart}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black dark:bg-white px-6 py-4 text-base font-semibold text-white dark:text-black shadow-md transition-all hover:shadow-lg"
                    >
                      Checkout
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartModal;
