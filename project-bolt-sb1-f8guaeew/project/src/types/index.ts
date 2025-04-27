export interface User {
  id: string;
  username: string;
  walletAddress: string;
  avatar: string;
  reputation: number;
  joinedDate: string;
  listings: Product[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  location: string;
  sellerId: string;
  createdAt: string;
  status: 'active' | 'sold' | 'pending';
}

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'escrow' | 'completed' | 'cancelled' | 'disputed';
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  receiverId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}