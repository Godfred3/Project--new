import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { ShoppingBag, Shield, ArrowRight, Wallet, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const { products } = useApp();
  
  // Get latest products, limit to 3
  const featuredProducts = products.filter(p => p.status === 'active').slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Decentralized Peer-to-Peer Marketplace
            </h1>
            <p className="text-xl mb-10">
              Buy and sell directly with others. No middlemen, no fees, complete privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg">Browse Marketplace</Button>
              </Link>
              <Link to="/create-listing">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-800">
                  List Your Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FleaChain?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                All transactions are secured by blockchain technology with an escrow system for safe exchanges.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-800 rounded-full mb-4">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">
                Trade directly with other users without intermediaries taking a cut of your transactions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-800 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Reputation</h3>
              <p className="text-gray-600">
                Our reputation system helps you identify trustworthy buyers and sellers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Items</h2>
            <Link to="/marketplace" className="text-blue-800 hover:text-blue-700 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No featured products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up using Internet Identity for secure blockchain authentication.
              </p>
            </div>
            
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">List or Browse</h3>
              <p className="text-gray-600">
                Create your product listing or browse available items in the marketplace.
              </p>
            </div>
            
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transaction</h3>
              <p className="text-gray-600">
                Use our escrow system to ensure safe and secure exchanges between users.
              </p>
            </div>
            
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full mb-4 font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Rate & Review</h3>
              <p className="text-gray-600">
                Leave feedback to help build a trustworthy community marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of users who are buying and selling without intermediaries.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="primary" className="bg-white text-teal-800 hover:bg-gray-100">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;