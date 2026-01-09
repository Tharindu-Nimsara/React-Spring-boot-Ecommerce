import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);

  const fetchCart = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (isFetchingRef.current) {
      return;
    }

    // Check if user is authenticated before fetching
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      const data = await cartAPI.getCart();
      // Handle different response structures
      const items = data.items || data || [];
      setCartItems(Array.isArray(items) ? items : []);
      setCartCount(Array.isArray(items) ? items.length : 0);
    } catch (error) {
      // Only log non-connection errors to avoid spam
      if (!error.message?.includes('connect') && !error.message?.includes('ECONNREFUSED')) {
        console.error('Error fetching cart:', error);
      }
      setCartItems([]);
      setCartCount(0);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const addToCart = async (productId, qty = 1) => {
    try {
      await cartAPI.addItem(productId, qty);
      await fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Re-throw with a more user-friendly message
      const errorMessage = error.message || 'Failed to add item to cart';
      throw new Error(errorMessage);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCart();
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, fetchCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

