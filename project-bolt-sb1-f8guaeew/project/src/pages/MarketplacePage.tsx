import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Button from '../components/ui/Button';

const MarketplacePage: React.FC = () => {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter products based on search query, category, price range
  useEffect(() => {
    let filtered = products.filter(product => product.status === 'active');
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters - desktop */}
        <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              <div 
                className={`cursor-pointer px-2 py-1 rounded ${!selectedCategory ? 'bg-blue-100 text-blue-800' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                All Categories
              </div>
              {categories.map(category => (
                <div 
                  key={category}
                  className={`cursor-pointer px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-800' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full border rounded-md px-2 py-1"
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                className="w-full border rounded-md px-2 py-1"
                min="0"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleClearFilters}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
            
            <Button 
              variant="outline" 
              className="md:hidden flex items-center justify-center"
              onClick={toggleFilters}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Filters - mobile */}
          {showFilters && (
            <div className="md:hidden bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={toggleFilters}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span 
                    className={`cursor-pointer px-2 py-1 rounded text-sm ${!selectedCategory ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                    onClick={() => setSelectedCategory('')}
                  >
                    All
                  </span>
                  {categories.map(category => (
                    <span 
                      key={category}
                      className={`cursor-pointer px-2 py-1 rounded text-sm ${selectedCategory === category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full border rounded-md px-2 py-1"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                    className="w-full border rounded-md px-2 py-1"
                    min="0"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  fullWidth 
                  onClick={toggleFilters}
                >
                  Apply Filters
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth 
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredProducts.length} items found
              {selectedCategory && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Items Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any items matching your criteria.
              </p>
              <Button onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;