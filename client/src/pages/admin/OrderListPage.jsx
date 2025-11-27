import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { X } from 'lucide-react'; // We use X icon for "Not Delivered"

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.token}` },
        };
        const { data } = await axios.get('http://localhost:3000/api/orders', config);
        setOrders(data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, [auth.token]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Orders</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">USER</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">DATE</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">TOTAL</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">PAID</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">DELIVERED</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:bg-black dark:divide-gray-800">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order._id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-black dark:text-white">
                  {order.user && order.user.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {order.isPaid ? (
                    <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {order.isDelivered && order.deliveredAt ? (
                    <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                  <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-indigo-900 bg-gray-100 px-3 py-1 rounded">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;