import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const { auth } = useAuth();

    // Form State
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    // Card details state (for dummy payment)
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [processing, setProcessing] = useState(false);

    // Redirect if cart is empty or user not logged in
    useEffect(() => {
        if (!auth) navigate('/login');
        if (cartItems.length === 0 && !orderPlaced) navigate('/shop');
    }, [auth, cartItems, navigate, orderPlaced]);

    // Calculations 
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    // Shipping is free if over $100, otherwise $10
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = itemsPrice + shippingPrice;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        try {
            // If card payment, simulate processing
            if (paymentMethod === 'Card') {
                setProcessing(true);
                // Simulate payment processing delay
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit/Debit Card',
                itemsPrice,
                shippingPrice,
                totalPrice,
                isPaid: paymentMethod === 'Card', // Auto-mark as paid for card payments
                paidAt: paymentMethod === 'Card' ? new Date().toISOString() : undefined,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            };

            const { data } = await axios.post(
                'http://localhost:3000/api/orders',
                orderData,
                config
            );

            // Success!
            if (paymentMethod === 'Card') {
                toast.success('Payment Successful! Order Placed!');
            } else {
                toast.success('Order Placed! Pay on delivery.');
            }
            setOrderPlaced(true);
            clearCart();
            navigate(`/order/${data._id}`);

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold uppercase tracking-widest">Checkout</h1>

            <form onSubmit={handlePlaceOrder}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">

                    {/* LEFT COLUMN: Shipping Form */}
                    <div>
                        <h2 className="text-xl font-medium text-black dark:text-white">Shipping Information</h2>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                <input
                                    type="text"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                                <input
                                    type="text"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mt-8">
                            <h2 className="text-xl font-medium text-black dark:text-white mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 dark:border-gray-700 dark:hover:border-purple-500">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">Pay when you receive the order</span>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 dark:border-gray-700 dark:hover:border-purple-500">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Card"
                                        checked={paymentMethod === 'Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">Pay securely with your card</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Card Payment Form (shown only if Card is selected) */}
                        {paymentMethod === 'Card' && (
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Card Details</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        maxLength="19"
                                        required={paymentMethod === 'Card'}
                                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        required={paymentMethod === 'Card'}
                                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            maxLength="5"
                                            required={paymentMethod === 'Card'}
                                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            maxLength="3"
                                            required={paymentMethod === 'Card'}
                                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    🔒 This is a demo payment. Any card details will work.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h2 className="text-lg font-medium text-black dark:text-white">Order Summary</h2>

                        <div className="mt-6 flow-root">
                            <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-black dark:text-white">
                                                    <h3>{item.name}</h3>
                                                    <p>${(item.price * item.qty).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                            <div className="flex justify-between text-base font-medium text-black dark:text-white">
                                <p>Subtotal</p>
                                <p>${itemsPrice.toFixed(2)}</p>
                            </div>
                            <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <p>Shipping</p>
                                <p>{shippingPrice === 0 ? 'Free' : `$${shippingPrice}`}</p>
                            </div>
                            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-black dark:text-white">
                                <p>Total</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Payment...
                                </span>
                            ) : (
                                paymentMethod === 'COD' ? 'Place Order (COD)' : 'Pay & Place Order'
                            )}
                        </button>
                        
                        {paymentMethod === 'COD' && (
                            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                💰 Payment will be collected on delivery
                            </p>
                        )}
                    </div>

                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;