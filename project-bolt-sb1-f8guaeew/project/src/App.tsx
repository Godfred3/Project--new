import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import CreateListingPage from './pages/CreateListingPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-listing" element={<CreateListingPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
          <footer className="bg-blue-900 text-white py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold mb-2">FleaChain</h3>
                  <p className="text-blue-200 text-sm">
                    Decentralized Peer-to-Peer Marketplace
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-blue-200 text-sm">
                    &copy; {new Date().getFullYear()} FleaChain. All rights reserved.
                  </p>
                  <p className="text-blue-200 text-xs mt-1">
                    Powered by Internet Computer
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;