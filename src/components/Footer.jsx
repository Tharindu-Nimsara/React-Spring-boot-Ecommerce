import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">SpareParts</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted source for quality vehicle spare parts. Find the right part for your vehicle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm mb-2">Email: support@spareparts.com</p>
            <p className="text-gray-300 text-sm">Phone: +94 (721) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 SpareParts Shop. University Project 2026.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

