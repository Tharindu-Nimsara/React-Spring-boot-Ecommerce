import { useState, useEffect, useRef } from 'react';
import { Edit, PlusCircle, Loader2, Power, PowerOff } from 'lucide-react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import ProductModal from '../../components/ProductModal';
import { getImageUrl, getPlaceholderImage } from '../../utils/imageUrl';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const { showToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleActivateProduct = async (id) => {
    try {
      await adminAPI.activateProduct(id);
      showToast('Product activated successfully', 'success');
      fetchProducts();
    } catch (error) {
      console.error('Error activating product:', error);
      showToast('Failed to activate product', 'error');
    }
  };

  const handleDeactivateProduct = async (id) => {
    try {
      await adminAPI.deactivateProduct(id);
      showToast('Product deactivated successfully', 'success');
      fetchProducts();
    } catch (error) {
      console.error('Error deactivating product:', error);
      showToast('Failed to deactivate product', 'error');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductSaved = () => {
    fetchProducts();
    handleModalClose();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    // Handle boolean active field (primitive boolean from backend, defaults to true)
    // If active is undefined/null, treat as active (default behavior)
    const isActive = product.active !== false;
    return activeTab === 'active' ? isActive : !isActive;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Products
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inactive'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inactive Products
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No {activeTab === 'active' ? 'active' : 'inactive'} products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isLowStock = (product.stockQuantity || 0) < 5;
                  const imageUrl = getImageUrl(product.imageUrl) || getPlaceholderImage();

                  const handleImageError = (e) => {
                    // Prevent infinite loop - set to data URI and remove handler
                    e.target.src = getPlaceholderImage();
                    e.target.onerror = null;
                  };

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                          onError={handleImageError}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${product.price?.toFixed(2) || '0.00'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${
                            isLowStock ? 'text-red-600' : 'text-gray-900'
                          }`}
                        >
                          {product.stockQuantity || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Product"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          {activeTab === 'active' ? (
                            <button
                              onClick={() => handleDeactivateProduct(product.id)}
                              className="text-orange-600 hover:text-orange-900"
                              title="Deactivate Product"
                            >
                              <PowerOff className="h-5 w-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateProduct(product.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Activate Product"
                            >
                              <Power className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={handleModalClose}
          onSave={handleProductSaved}
        />
      )}
    </div>
  );
};

export default ProductManagement;

