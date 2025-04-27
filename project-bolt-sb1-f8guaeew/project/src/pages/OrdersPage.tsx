import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { ShoppingBag, CheckCircle, XCircle, Clock, StarIcon } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const { currentUser, orders, getProductById, getUserOrders, completeTransaction, cancelTransaction, createReview } = useApp();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  const userOrders = getUserOrders(currentUser.id);
  
  // Group orders by role (buyer/seller) and status
  const buyerOrders = userOrders.filter(order => order.buyerId === currentUser.id);
  const sellerOrders = userOrders.filter(order => order.sellerId === currentUser.id);
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'escrow': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'disputed': return 'danger';
      default: return 'default';
    }
  };
  
  const handleCompleteOrder = (orderId: string) => {
    completeTransaction(orderId);
  };
  
  const handleCancelOrder = (orderId: string) => {
    cancelTransaction(orderId);
  };
  
  const startReview = (orderId: string) => {
    setReviewingOrderId(orderId);
    setReviewText('');
    setRating(5);
  };
  
  const submitReview = (orderId: string, receiverId: string) => {
    createReview({
      orderId,
      receiverId,
      rating,
      comment: reviewText
    });
    setReviewingOrderId(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {userOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-6">
            You don't have any orders yet. Visit the marketplace to find items to purchase.
          </p>
          <Button onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Purchased Orders */}
          {buyerOrders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Items You Purchased</h2>
              <div className="grid gap-4">
                {buyerOrders.map(order => {
                  const product = getProductById(order.productId);
                  return product ? (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.title}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          <div className="md:w-3/4 md:pl-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                                <p className="text-gray-600 mb-2">Order ID: {order.id.substring(0, 8)}</p>
                                <div className="flex items-center mb-4">
                                  <Badge variant={getStatusBadgeVariant(order.status)}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                  <span className="ml-2 text-gray-500">
                                    Updated {new Date(order.updatedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="font-semibold text-lg text-blue-800">
                                  {order.amount} {order.currency}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 px-6 py-3">
                        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                          <div className="text-sm text-gray-600 mb-3 sm:mb-0">
                            {order.status === 'escrow' ? (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-blue-800" />
                                <span>Funds in escrow. Waiting for completion.</span>
                              </div>
                            ) : order.status === 'completed' ? (
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                <span>Transaction completed successfully</span>
                              </div>
                            ) : order.status === 'cancelled' ? (
                              <div className="flex items-center">
                                <XCircle className="h-4 w-4 mr-1 text-red-600" />
                                <span>Transaction was cancelled</span>
                              </div>
                            ) : null}
                          </div>
                          <div className="flex space-x-3">
                            {order.status === 'escrow' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="success"
                                  onClick={() => handleCompleteOrder(order.id)}
                                >
                                  Complete Purchase
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger"
                                  onClick={() => handleCancelOrder(order.id)}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {order.status === 'completed' && reviewingOrderId !== order.id && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => startReview(order.id)}
                              >
                                <StarIcon className="h-4 w-4 mr-1" />
                                Leave Review
                              </Button>
                            )}
                            {reviewingOrderId === order.id && (
                              <div className="w-full">
                                <div className="flex items-center mb-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => setRating(star)}
                                      className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                      <StarIcon className="h-6 w-6" />
                                    </button>
                                  ))}
                                </div>
                                <textarea
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  placeholder="Write your review..."
                                  className="w-full p-2 border rounded-md mb-2"
                                  rows={3}
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setReviewingOrderId(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => submitReview(order.id, order.sellerId)}
                                    disabled={!reviewText.trim()}
                                  >
                                    Submit Review
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {/* Sold Orders */}
          {sellerOrders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Items You're Selling</h2>
              <div className="grid gap-4">
                {sellerOrders.map(order => {
                  const product = getProductById(order.productId);
                  return product ? (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.title}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          <div className="md:w-3/4 md:pl-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                                <p className="text-gray-600 mb-2">Order ID: {order.id.substring(0, 8)}</p>
                                <div className="flex items-center mb-4">
                                  <Badge variant={getStatusBadgeVariant(order.status)}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                  <span className="ml-2 text-gray-500">
                                    Updated {new Date(order.updatedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="font-semibold text-lg text-blue-800">
                                  {order.amount} {order.currency}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 px-6 py-3">
                        <div className="w-full flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {order.status === 'escrow' ? (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-blue-800" />
                                <span>Buyer has placed funds in escrow</span>
                              </div>
                            ) : order.status === 'completed' ? (
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                <span>Transaction completed successfully</span>
                              </div>
                            ) : order.status === 'cancelled' ? (
                              <div className="flex items-center">
                                <XCircle className="h-4 w-4 mr-1 text-red-600" />
                                <span>Transaction was cancelled</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;