// this is the recipt page 
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config/api';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { auth } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const deliverOrderHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };
      await axios.put(`${BACKEND_URL}/api/orders/${order._id}/deliver`, {}, config);
      
      toast.success('Order Delivered');
      
      // Reload the page logic to show the green "Delivered" box
      // (Simplest way is to just call fetchOrder() again if you extracted it, 
      //  or just reload the window)
      window.location.reload(); 
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const markAsPaidHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };
      await axios.put(`${BACKEND_URL}/api/orders/${order._id}/pay`, {}, config);
      
      toast.success('Order Marked as Paid');
      window.location.reload(); 
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.token}` },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/orders/${orderId}`, config);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    if (auth) {
      fetchOrder();
    }
  }, [orderId, auth]);

  if (loading) return <div className="p-10 text-center">Loading Order...</div>;
  if (!order) return <div className="p-10 text-center">Order Not Found</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold uppercase tracking-widest text-black dark:text-white mb-8">
        Order {order._id}
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        
        {/* LEFT COLUMN: Details */}
        <div className="space-y-6">
          
          {/* Shipping Info */}
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <h2 className="text-lg font-medium text-black dark:text-white mb-4">Shipping</h2>
            <p className="mb-2"><strong className="mr-2">Name:</strong> {order.user.name}</p>
            <p className="mb-2"><strong className="mr-2">Email:</strong> {order.user.email}</p>
            <p className="mb-4">
              <strong className="mr-2">Address:</strong> 
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="rounded bg-green-100 p-2 text-green-700">Delivered at {order.deliveredAt}</div>
            ) : (
              <div className="rounded bg-red-100 p-2 text-red-700">Not Delivered</div>
            )}
          </div>

          {/* Payment Info */}
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <h2 className="text-lg font-medium text-black dark:text-white mb-4">Payment Method</h2>
            <p className="mb-4"><strong className="mr-2">Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="rounded bg-green-100 p-2 text-green-700">Paid on {order.paidAt}</div>
            ) : (
              <div className="rounded bg-red-100 p-2 text-red-700">Not Paid</div>
            )}
          </div>

          {/* Order Items */}
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <h2 className="text-lg font-medium text-black dark:text-white mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? <p>Order is empty</p> : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex py-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                    <div className="ml-4">
                      <Link to={`/product/${item.product}`} className="text-sm font-medium hover:underline">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-medium text-black dark:text-white mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            
            {auth && auth.isAdmin && (
              <>
                {!order.isPaid && (
                  <button
                    onClick={markAsPaidHandler}
                    className="mt-4 w-full rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:from-green-700 hover:to-emerald-700"
                  >
                    💰 Mark as Paid
                  </button>
                )}
                {!order.isDelivered && (
                  <button
                    onClick={deliverOrderHandler}
                    className="mt-4 w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700"
                  >
                    🚚 Mark as Delivered
                  </button>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;