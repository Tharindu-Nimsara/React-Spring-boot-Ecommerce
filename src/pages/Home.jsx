import { Link } from 'react-router-dom';
import { Car, Wrench, Zap } from 'lucide-react';

const Home = () => {
  const categories = [
    {
      name: 'Engine Parts',
      icon: <Wrench className="h-12 w-12" />,
      description: 'High-quality engine components',
      link: '/shop?category=Engine',
    },
    {
      name: 'Brake Systems',
      icon: <Car className="h-12 w-12" />,
      description: 'Reliable braking solutions',
      link: '/shop?category=Brakes',
    },
    {
      name: 'Lighting',
      icon: <Zap className="h-12 w-12" />,
      description: 'LED and halogen options',
      link: '/shop?category=Lighting',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Right Part for Your Vehicle
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Quality spare parts for all makes and models
            </p>
            <Link
              to="/shop"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Quality Parts</h3>
              <p className="text-gray-600">
                We source only the highest quality parts from trusted manufacturers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Extensive catalog covering all major vehicle makes and models
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to get you back on the road faster
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

