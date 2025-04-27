import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Product, Order, Message, Review } from '../types';
import { mockUsers, mockProducts, mockOrders, mockReviews, mockMessages } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  products: Product[];
  orders: Order[];
  reviews: Review[];
  messages: Message[];
  setCurrentUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  createListing: (product: Omit<Product, 'id' | 'sellerId' | 'createdAt' | 'status'>) => void;
  purchaseProduct: (productId: string) => void;
  completeTransaction: (orderId: string) => void;
  cancelTransaction: (orderId: string) => void;
  createReview: (review: Omit<Review, 'id' | 'createdAt' | 'reviewerId'>) => void;
  sendMessage: (receiverId: string, content: string) => void;
  getProductById: (id: string) => Product | undefined;
  getSellerById: (id: string) => User | undefined;
  getUserMessages: (userId: string) => Message[];
  getUserOrders: (userId: string) => Order[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call/blockchain authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.username === username);
        if (user) {
          setCurrentUser(user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createListing = (productData: Omit<Product, 'id' | 'sellerId' | 'createdAt' | 'status'>) => {
    if (!currentUser) return;
    
    const newProduct: Product = {
      ...productData,
      id: `product-${products.length + 1}`,
      sellerId: currentUser.id,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setProducts([...products, newProduct]);
    
    // Update user listings
    if (currentUser) {
      const updatedCurrentUser = {
        ...currentUser,
        listings: [...currentUser.listings, newProduct]
      };
      setCurrentUser(updatedCurrentUser);
    }
  };

  const purchaseProduct = (productId: string) => {
    if (!currentUser) return;
    
    const product = products.find(p => p.id === productId);
    if (!product || product.status !== 'active') return;
    
    // Create order in escrow state
    const newOrder: Order = {
      id: `order-${orders.length + 1}`,
      productId,
      buyerId: currentUser.id,
      sellerId: product.sellerId,
      status: 'escrow',
      amount: product.price,
      currency: product.currency,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setOrders([...orders, newOrder]);
    
    // Update product status
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, status: 'pending' } : p
    );
    setProducts(updatedProducts);
  };

  const completeTransaction = (orderId: string) => {
    // Update order status
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed', updatedAt: new Date().toISOString() } 
        : order
    );
    
    const completedOrder = updatedOrders.find(o => o.id === orderId);
    if (completedOrder) {
      // Update product status
      const updatedProducts = products.map(product => 
        product.id === completedOrder.productId 
          ? { ...product, status: 'sold' } 
          : product
      );
      setProducts(updatedProducts);
    }
    
    setOrders(updatedOrders);
  };

  const cancelTransaction = (orderId: string) => {
    // Update order status
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } 
        : order
    );
    
    const cancelledOrder = updatedOrders.find(o => o.id === orderId);
    if (cancelledOrder) {
      // Revert product status to active
      const updatedProducts = products.map(product => 
        product.id === cancelledOrder.productId 
          ? { ...product, status: 'active' } 
          : product
      );
      setProducts(updatedProducts);
    }
    
    setOrders(updatedOrders);
  };

  const createReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'reviewerId'>) => {
    if (!currentUser) return;
    
    const newReview: Review = {
      ...reviewData,
      id: `review-${reviews.length + 1}`,
      reviewerId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    
    setReviews([...reviews, newReview]);
  };

  const sendMessage = (receiverId: string, content: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: `msg-${messages.length + 1}`,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getSellerById = (id: string) => {
    return mockUsers.find(user => user.id === id);
  };

  const getUserMessages = (userId: string) => {
    return messages.filter(msg => 
      msg.senderId === userId || msg.receiverId === userId
    );
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => 
      order.buyerId === userId || order.sellerId === userId
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        products,
        orders,
        reviews,
        messages,
        setCurrentUser,
        login,
        logout,
        createListing,
        purchaseProduct,
        completeTransaction,
        cancelTransaction,
        createReview,
        sendMessage,
        getProductById,
        getSellerById,
        getUserMessages,
        getUserOrders
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};