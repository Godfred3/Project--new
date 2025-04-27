import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardContent } from '../components/ui/Card';
import { MessageSquare, Calendar, MapPin, ShieldCheck, Star, AlertTriangle } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getSellerById, currentUser, purchaseProduct, sendMessage } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [message, setMessage] = useState('');
  
  const product = getProductById(id || '');
  const seller = product ? getSellerById(product.sellerId) : undefined;
  
  if (!product || !seller) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for might have been removed or doesn't exist.</p>
        <Button onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }
  
  const isOwner = currentUser && currentUser.id === product.sellerId;
  const canBuy = currentUser && !isOwner && product.status === 'active';
  
  const handleBuy = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    purchaseProduct(product.id);
    navigate('/orders');
  };
  
  const handleContact = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (message.trim()) {
      sendMessage(seller.id, message);
      setMessage('');
      navigate('/messages');
    }
  };
  
  // Format the price with the currency
  const formattedPrice = `${product.price} ${product.currency}`;
  
  // Format dates
  const listedDate = new Date(product.createdAt).toLocaleDateString();
  
  // Get status badge variant
  const statusBadgeVariant = 
    product.status === 'active' ? 'success' : 
    product.status === 'pending' ? 'warning' : 'default';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Image gallery */}
          <div className="md:w-1/2 p-4">
            <div className="relative h-80 md:h-96 mb-4 overflow-hidden rounded-lg">
              {product.images.length > 0 ? (
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              <Badge 
                variant={statusBadgeVariant}
                className="absolute top-4 right-4"
              >
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </Badge>
            </div>
            
            {product.images.length > 1 && (
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
              </div>
              <div className="flex items-center mt-2">
                <Badge variant="primary" size="md" className="mr-2">
                  {product.category}
                </Badge>
                <Badge variant="secondary" size="md">
                  {product.condition}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-blue-800 mt-4">{formattedPrice}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Listed on {listedDate}</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1" />
                <span>Secured by blockchain escrow</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Seller Information</h2>
              <div className="flex items-center">
                <Avatar src={seller.avatar} fallback={seller.username} size="md" />
                <div className="ml-3">
                  <p className="font-medium">{seller.username}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{seller.reputation.toFixed(1)} Reputation</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              {canBuy && (
                <Button onClick={handleBuy} size="lg" fullWidth>
                  Buy Now with Escrow
                </Button>
              )}
              
              {!isOwner && currentUser && (
                <div>
                  <div className="relative mb-2">
                    <textarea
                      placeholder="Ask a question about this item..."
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleContact}
                    variant="secondary"
                    disabled={!message.trim()}
                    fullWidth
                    className="flex items-center justify-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              )}
              
              {isOwner && (
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate(`/edit-listing/${product.id}`)} 
                    variant="outline" 
                    fullWidth
                  >
                    Edit Listing
                  </Button>
                </div>
              )}
              
              {!currentUser && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center mb-3">
                      You need to be logged in to buy or contact the seller
                    </p>
                    <Button 
                      onClick={() => navigate('/login')} 
                      variant="primary" 
                      fullWidth
                    >
                      Login or Create Account
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;