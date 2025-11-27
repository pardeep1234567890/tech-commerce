import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Package, Calendar, CreditCard, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Loading from '../components/Loading';
import { BACKEND_URL } from '../config/api';

const MyOrdersPage = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.token}` },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/orders/myorders`, config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    if (auth) {
      fetchMyOrders();
    }
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Package size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Order ID
                        </p>
                        <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                          {order._id}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span className="text-sm">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Total
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package size={18} className="text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {order.orderItems.length} {order.orderItems.length === 1 ? 'Item' : 'Items'}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {order.orderItems.slice(0, 5).map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.orderItems.length > 5 && (
                        <div className="flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                          +{order.orderItems.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Payment Status */}
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-gray-500 dark:text-gray-400" />
                        {order.isPaid ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                            <CheckCircle size={14} />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full">
                            <Clock size={14} />
                            {order.paymentMethod === 'COD' ? 'COD' : 'Not Paid'}
                          </span>
                        )}
                      </div>

                      {/* Delivery Status */}
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-gray-500 dark:text-gray-400" />
                        {order.isDelivered ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                            <CheckCircle size={14} />
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full">
                            <Clock size={14} />
                            Processing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 text-sm font-medium"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
