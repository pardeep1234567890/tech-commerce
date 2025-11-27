import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-bold text-black dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Products */}
        <Link to="/admin/products" className="group block rounded-lg border border-gray-200 p-6 hover:border-black dark:border-gray-700 dark:hover:border-white">
          <div className="flex items-center">
            <div className="rounded-md bg-gray-100 p-3 group-hover:bg-black group-hover:text-white dark:bg-gray-800">
              <Package size={24} />
            </div>
            <h3 className="ml-4 text-xl font-medium text-black dark:text-white">Manage Products</h3>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Add, edit, or delete products from the catalog.</p>
        </Link>

        {/* Card 2: Orders */}
        <Link to="/admin/orders" className="group block rounded-lg border border-gray-200 p-6 hover:border-black dark:border-gray-700 dark:hover:border-white">
          <div className="flex items-center">
            <div className="rounded-md bg-gray-100 p-3 group-hover:bg-black group-hover:text-white dark:bg-gray-800">
              <ShoppingBag size={24} />
            </div>
            <h3 className="ml-4 text-xl font-medium text-black dark:text-white">Manage Orders</h3>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">View customer orders and mark them as delivered.</p>
        </Link>

        {/* Card 3: Users (Future Feature) */}
        <div className="opacity-50 cursor-not-allowed group block rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <div className="flex items-center">
            <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
              <Users size={24} />
            </div>
            <h3 className="ml-4 text-xl font-medium text-black dark:text-white">Manage Users</h3>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Coming soon in V2.0.</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;