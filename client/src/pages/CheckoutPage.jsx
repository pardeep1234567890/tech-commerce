import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config/api';

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
    const [processing, setProcessing] = useState(false);

    // Redirect if cart is empty or user not logged in
    useEffect(() => {
        if (!auth) navigate('/login');
        if (cartItems.length === 0 && !orderPlaced) navigate('/shop');
    }, [auth, cartItems, navigate, orderPlaced]);

    // Calculations 
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    // Shipping is free if over ₹5000, otherwise ₹500
    const shippingPrice = itemsPrice > 5000 ? 0 : 500;
    const totalPrice = itemsPrice + shippingPrice;

    const config = {
        headers: {
            Authorization: `Bearer ${auth?.token}`,
        },
    };

    // Build the order data object (reused by both COD and Razorpay flows)
    const buildOrderData = (isPaid = false) => ({
        orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Razorpay',
        itemsPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt: isPaid ? new Date().toISOString() : undefined,
    });

    // ===== COD FLOW =====
    const handleCODOrder = async () => {
        try {
            setProcessing(true);
            const { data } = await axios.post(
                `${BACKEND_URL}/api/orders`,
                buildOrderData(false),
                config
            );
            toast.success('Order Placed! Pay on delivery.');
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

    // ===== RAZORPAY FLOW =====
    const handleRazorpayPayment = async () => {
        try {
            setProcessing(true);

            // Step 1: Create our order in the DB first (unpaid)
            const { data: savedOrder } = await axios.post(
                `${BACKEND_URL}/api/orders`,
                buildOrderData(false),
                config
            );

            // Step 2: Create a Razorpay order on the server
            const { data: razorpayOrder } = await axios.post(
                `${BACKEND_URL}/api/payment/order`,
                { amount: totalPrice },
                config
            );

            // Step 3: Get the Razorpay key
            const { data: keyData } = await axios.get(`${BACKEND_URL}/api/payment/key`);

            // Step 4: Open Razorpay checkout popup
            const options = {
                key: keyData.key,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'Aura Apparel',
                description: `Order #${savedOrder._id}`,
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    // Step 5: Verify payment on server
                    try {
                        const { data: verifiedOrder } = await axios.post(
                            `${BACKEND_URL}/api/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: savedOrder._id,
                            },
                            config
                        );
                        toast.success('Payment Successful! Order Placed!');
                        setOrderPlaced(true);
                        clearCart();
                        navigate(`/order/${verifiedOrder._id}`);
                    } catch (error) {
                        toast.error('Payment verification failed. Contact support.');
                    }
                },
                prefill: {
                    name: auth?.name || '',
                    email: auth?.email || '',
                },
                theme: {
                    color: '#000000',
                },
                modal: {
                    ondismiss: function () {
                        setProcessing(false);
                        toast.info('Payment cancelled.');
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                toast.error(`Payment failed: ${response.error.description}`);
                setProcessing(false);
            });
            rzp.open();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            setProcessing(false);
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (paymentMethod === 'COD') {
            await handleCODOrder();
        } else {
            await handleRazorpayPayment();
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
                                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-black focus:ring-black dark:text-white dark:focus:ring-white"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">Pay when you receive the order</span>
                                    </div>
                                </label>

                                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'Razorpay' ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Razorpay"
                                        checked={paymentMethod === 'Razorpay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-black focus:ring-black dark:text-white dark:focus:ring-white"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Pay Online</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">UPI, Credit/Debit Card, Net Banking, Wallets</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Razorpay info note */}
                        {paymentMethod === 'Razorpay' && (
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-600 dark:text-blue-400 text-lg">🔒</span>
                                    <div>
                                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Secure Payment via Razorpay</p>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                            You'll be redirected to Razorpay's secure checkout. Supports UPI (GPay, PhonePe),
                                            Credit/Debit Cards, Net Banking, and Wallets.
                                        </p>
                                    </div>
                                </div>
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
                                                    <p>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
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
                                <p>₹{itemsPrice.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <p>Shipping</p>
                                <p>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</p>
                            </div>
                            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-black dark:text-white">
                                <p>Total</p>
                                <p>₹{totalPrice.toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full rounded-md bg-black dark:bg-white px-4 py-3 text-base font-medium text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                paymentMethod === 'COD' ? 'Place Order (COD)' : `Pay ₹${totalPrice.toLocaleString('en-IN')}`
                            )}
                        </button>
                        
                        {paymentMethod === 'COD' && (
                            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                💰 Payment will be collected on delivery
                            </p>
                        )}
                        {paymentMethod === 'Razorpay' && (
                            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                🔒 Secured by Razorpay. Your card details are never stored.
                            </p>
                        )}
                    </div>

                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;