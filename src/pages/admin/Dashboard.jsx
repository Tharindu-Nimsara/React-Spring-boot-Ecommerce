import { useState, useEffect } from 'react';
import { Package, AlertTriangle, ShoppingBag, PowerOff } from 'lucide-react';
import { adminAPI } from '../../services/api';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalOrders: 0,
    inactiveProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [products, orders] = await Promise.all([
          adminAPI.getAllProducts(),
          adminAPI.getAllOrders(),
        ]);

        const productsArray = Array.isArray(products) ? products : [];
        // Handle orders - could be array, object with orders property, or nested structure
        let ordersArray = [];
        if (Array.isArray(orders)) {
          ordersArray = orders;
        } else if (orders && typeof orders === 'object') {
          // Check if orders is an object with an 'orders' property
          if (Array.isArray(orders.orders)) {
            ordersArray = orders.orders;
          } else if (Array.isArray(orders.data)) {
            ordersArray = orders.data;
          } else {
            // If it's an object but not an array, try to convert values to array
            ordersArray = Object.values(orders).filter(item => item && typeof item === 'object');
          }
        }
        
        console.log('Orders data:', orders);
        console.log('Orders array length:', ordersArray.length);

        const lowStock = productsArray.filter(
          (p) => (p.stockQuantity || 0) < 5
        ).length;

        const inactiveProducts = productsArray.filter(
          (p) => p.active === false
        ).length;

        setStats({
          totalProducts: productsArray.length,
          lowStockItems: lowStock,
          totalOrders: ordersArray.length,
          inactiveProducts: inactiveProducts,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
    {
      title: 'Inactive Products',
      value: stats.inactiveProducts,
      icon: PowerOff,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

