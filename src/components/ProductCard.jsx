import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useState, useRef } from 'react';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUrl';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const imageErrorRef = useRef(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    setAdding(true);
    try {
      await addToCart(product.id, 1);
      // Success - could add a toast notification here
    } catch (error) {
      const errorMessage = error.message || 'Failed to add item to cart. Please try again.';
      alert(errorMessage);
    } finally {
      setAdding(false);
    }
  };

  const handleImageError = (e) => {
    // Prevent infinite loop - only set fallback once
    if (!imageErrorRef.current) {
      imageErrorRef.current = true;
      e.target.src = getPlaceholderImage();
      // Remove onError to prevent further calls
      e.target.onerror = null;
    }
  };

  const imageUrl = getImageUrl(product.imageUrl) || getPlaceholderImage();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-primary mb-1 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-accent">${product.price?.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex items-center space-x-1 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{adding ? 'Adding...' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

