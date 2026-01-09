import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { checkoutAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUrl';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, loading } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    setLocalItems(cartItems);
  }, [cartItems]);

  const calculateSubtotal = () => {
    return localItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const handleCheckout = async () => {
    if (localItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setCheckingOut(true);
    try {
      await checkoutAPI.checkout({});
      alert('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to complete checkout. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        {localItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {localItems.map((item) => {
                const product = item.product;
                const imageUrl = getImageUrl(product?.imageUrl) || getPlaceholderImage();

                const handleImageError = (e) => {
                  // Prevent infinite loop - set to data URI and remove handler
                  e.target.src = getPlaceholderImage();
                  e.target.onerror = null;
                };

                return (
                  <div
                    key={item.id || item.productId}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {product?.name || 'Product'}
                      </h3>
                      <p className="text-gray-600 mb-2">{product?.category}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-accent">
                            ${product?.price?.toFixed(2) || '0.00'}
                          </p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          ${((product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-primary">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <span>{checkingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
                  {!checkingOut && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

