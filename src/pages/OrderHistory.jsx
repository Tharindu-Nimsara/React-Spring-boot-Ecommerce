import { useState, useEffect } from 'react';
import { checkoutAPI } from '../services/api';
import { Loader2, Package } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await checkoutAPI.getHistory();
        console.log('Order history API response:', data); // Debug log
        setOrders(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError('Failed to load order history. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">No orders found</p>
            <p className="text-gray-500">Your order history will appear here once you place an order.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              // Calculate total from items if total field is missing or 0
              const calculateOrderTotal = () => {
                // Try to get total from various possible field names
                const totalFromField = 
                  order.totalAmount || 
                  order.total || 
                  order.totalPrice || 
                  order.amount || 
                  order.orderTotal ||
                  0;

                // If total exists and is greater than 0, use it
                if (totalFromField > 0) {
                  return totalFromField;
                }

                // Otherwise, calculate from items
                if (order.items && Array.isArray(order.items) && order.items.length > 0) {
                  return order.items.reduce((sum, item) => {
                    const itemPrice = item.price || item.product?.price || 0;
                    const itemQuantity = item.quantity || 1;
                    return sum + (itemPrice * itemQuantity);
                  }, 0);
                }

                return 0;
              };

              const orderTotal = calculateOrderTotal();

              return (
                <div key={order.id || order.orderId} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">
                        Order #{order.id || order.orderId || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.orderDate || order.createdAt || order.date
                          ? new Date(order.orderDate || order.createdAt || order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Date not available'}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-xl font-bold text-accent">
                        ${orderTotal.toFixed(2)}
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status || 'PROCESSING'}
                      </span>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                      {order.items.map((item, index) => {
                        const itemPrice = item.price || item.product?.price || 0;
                        const itemQuantity = item.quantity || 1;
                        const itemTotal = itemPrice * itemQuantity;
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>
                              {item.productName || item.name || item.product?.name || 'Product'} x {itemQuantity}
                            </span>
                            <span className="font-semibold">
                              ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

