import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { adminAPI } from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const calculateOrderTotal = (order) => {
    const totalFromField =
      order.totalAmount ||
      order.total ||
      order.totalPrice ||
      order.amount ||
      order.orderTotal ||
      0;

    if (totalFromField > 0) {
      return totalFromField;
    }

    if (order.items && Array.isArray(order.items) && order.items.length > 0) {
      return order.items.reduce((sum, item) => {
        const itemPrice = item.price || item.product?.price || 0;
        const itemQuantity = item.quantity || 1;
        return sum + itemPrice * itemQuantity;
      }, 0);
    }

    return 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-xl text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const orderId = order.id || order.orderId;
            const isExpanded = expandedOrders.has(orderId);
            const orderTotal = calculateOrderTotal(order);

            return (
              <div key={orderId} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order #{orderId}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                      <p className="text-sm text-gray-600 mt-1">
                        {order.orderDate || order.createdAt || order.date
                          ? new Date(
                              order.orderDate || order.createdAt || order.date
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Date not available'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-xl font-bold text-accent">
                          ${orderTotal.toFixed(2)}
                        </p>
                      </div>
                      {order.items && order.items.length > 0 && (
                        <button
                          onClick={() => toggleOrder(orderId)}
                          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isExpanded && order.items && order.items.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => {
                          const itemPrice = item.price || item.product?.price || 0;
                          const itemQuantity = item.quantity || 1;
                          const itemTotal = itemPrice * itemQuantity;

                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                            >
                              <span className="text-sm text-gray-700">
                                {item.productName ||
                                  item.name ||
                                  item.product?.name ||
                                  'Product'}{' '}
                                x {itemQuantity}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                ${itemTotal.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

