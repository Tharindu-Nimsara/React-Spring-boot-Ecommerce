import { Link } from "react-router-dom";
import { Car, Wrench, Zap, Shield, Truck, Sparkles } from "lucide-react";

const Home = () => {
  const categories = [
    {
      name: "Engine Parts",
      icon: <Wrench className="h-12 w-12" />,
      description: "High-quality engine components",
      link: "/shop?category=Engine",
      image:
        "https://images.unsplash.com/photo-1642351376726-a96985803ee8?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Brake Systems",
      icon: <Car className="h-12 w-12" />,
      description: "Reliable braking solutions",
      link: "/shop?category=Brakes",
      image:
        "https://images.unsplash.com/photo-1710007106044-f9a3b9e08c84?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lighting",
      icon: <Zap className="h-12 w-12" />,
      description: "LED and halogen options",
      link: "/shop?category=Lighting",
      image:
        "https://images.unsplash.com/photo-1765460076988-a854a04b63d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Parts",
      description:
        "We source only the highest quality parts from trusted manufacturers",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Wide Selection",
      description:
        "Extensive catalog covering all major vehicle makes and models",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Fast Shipping",
      description:
        "Quick and reliable delivery to get you back on the road faster",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Vehicle Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Vehicle Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop"
            alt="Vehicle"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFlMjkzYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBmMTcyYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=";
            }}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find the Right Part for
              <span className="block bg-gradient-to-r from-accent to-accent-blue bg-clip-text text-transparent">
                Your Vehicle
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Quality spare parts for all makes and models. Get your vehicle
              back on the road with premium components.
            </p>
            <div className="flex justify-center items-center animate-fade-in delay-300">
              <Link
                to="/shop"
                className="group relative inline-block bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-2xl hover:shadow-accent/50 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Categories with Images */}
      <section className="py-20 bg-gradient-to-b from-background to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-blue/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our premium parts collection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmMzczMTYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZTI5M2IiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WZWhpY2xlIFBhcnRzPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-accent mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                  <div className="mt-4 text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                    Shop Now →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Parts for Every Vehicle
            </h2>
            <p className="text-xl text-gray-300">
              From sports cars to heavy-duty trucks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group animate-slide-in-left">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
                  alt="Sports Car"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Sports Cars
                  </h3>
                  <p className="text-gray-300">
                    High-performance parts for your sports vehicle
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group animate-fade-in delay-200">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop"
                  alt="Rolls Royce Luxury Vehicle"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Luxury Vehicles
                  </h3>
                  <p className="text-gray-300">
                    Premium components for luxury models
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group animate-slide-in-right delay-300">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1706805184346-62634c6446f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="SUV Truck"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    // Try alternative Truck/SUV image from Unsplash
                    e.target.src =
                      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&q=80";
                    e.target.onerror = null; // Prevent infinite loop
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Trucks & SUVs
                  </h3>
                  <p className="text-gray-300">
                    Durable parts for heavy-duty vehicles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-blue/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted partner for vehicle parts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-accent to-accent-blue w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent via-accent-blue to-accent text-white relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-fade-in delay-200">
            Browse our extensive catalog and find the perfect parts for your
            vehicle
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-accent px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 animate-fade-in delay-300"
          >
            Explore Our Shop
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
