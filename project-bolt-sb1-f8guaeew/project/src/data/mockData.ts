import { User, Product, Order, Review, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'AliceBlockchain',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 4.8,
    joinedDate: '2024-01-15',
    listings: []
  },
  {
    id: 'user-2',
    username: 'BobCrypto',
    walletAddress: '0x0j9i8h7g6f5e4d3c2b1a',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 4.5,
    joinedDate: '2024-02-20',
    listings: []
  },
  {
    id: 'user-3',
    username: 'CharlieNFT',
    walletAddress: '0x2b3c4d5e6f7g8h9i0j1a',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 4.9,
    joinedDate: '2023-12-10',
    listings: []
  },
];

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    title: 'Vintage Mechanical Keyboard',
    description: 'Rare mechanical keyboard from the 90s, fully functional with Cherry MX Blue switches. Perfect for collectors and typing enthusiasts.',
    price: 120,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    condition: 'good',
    location: 'San Francisco, CA',
    sellerId: 'user-1',
    createdAt: '2025-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'product-2',
    title: 'Digital Art Collection - Blockchain Series',
    description: 'Limited edition digital art collection inspired by blockchain technology. Includes 5 high-resolution images with certificate of authenticity.',
    price: 250,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3328892/pexels-photo-3328892.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Art',
    condition: 'new',
    location: 'New York, NY',
    sellerId: 'user-2',
    createdAt: '2025-03-10T14:45:00Z',
    status: 'active'
  },
  {
    id: 'product-3',
    title: 'Mountain Bike - Trek 3500',
    description: 'Trek 3500 mountain bike, 3 years old but in excellent condition. Recently serviced with new brake pads and tuned gears.',
    price: 400,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5234774/pexels-photo-5234774.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Sports',
    condition: 'good',
    location: 'Austin, TX',
    sellerId: 'user-3',
    createdAt: '2025-03-05T09:15:00Z',
    status: 'active'
  },
  {
    id: 'product-4',
    title: 'Handcrafted Leather Wallet',
    description: 'Handmade genuine leather wallet with multiple card slots and RFID protection. Crafted with premium quality full-grain leather.',
    price: 75,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/2252338/pexels-photo-2252338.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/9429970/pexels-photo-9429970.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Fashion',
    condition: 'new',
    location: 'Portland, OR',
    sellerId: 'user-1',
    createdAt: '2025-03-02T16:20:00Z',
    status: 'active'
  },
  {
    id: 'product-5',
    title: 'Smart Home Hub - Latest Model',
    description: 'Latest model smart home hub with voice control. Compatible with all major smart home devices. Lightly used for 2 months.',
    price: 180,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/4790255/pexels-photo-4790255.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    condition: 'like-new',
    location: 'Seattle, WA',
    sellerId: 'user-2',
    createdAt: '2025-02-28T11:10:00Z',
    status: 'active'
  },
  {
    id: 'product-6',
    title: 'Antique Wooden Bookshelf',
    description: 'Beautiful antique wooden bookshelf from the early 1900s. Solid oak construction with intricate carvings. Some minor wear consistent with age.',
    price: 350,
    currency: 'ICP',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Furniture',
    condition: 'good',
    location: 'Chicago, IL',
    sellerId: 'user-3',
    createdAt: '2025-02-25T13:30:00Z',
    status: 'active'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    productId: 'product-2',
    buyerId: 'user-3',
    sellerId: 'user-2',
    status: 'completed',
    amount: 250,
    currency: 'ICP',
    createdAt: '2025-02-15T09:25:00Z',
    updatedAt: '2025-02-18T14:30:00Z'
  },
  {
    id: 'order-2',
    productId: 'product-4',
    buyerId: 'user-2',
    sellerId: 'user-1',
    status: 'escrow',
    amount: 75,
    currency: 'ICP',
    createdAt: '2025-03-16T10:15:00Z',
    updatedAt: '2025-03-16T10:15:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    orderId: 'order-1',
    reviewerId: 'user-3',
    receiverId: 'user-2',
    rating: 5,
    comment: 'Excellent seller! Item was exactly as described and shipping was quick.',
    createdAt: '2025-02-20T11:45:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-2',
    receiverId: 'user-1',
    content: 'Hi, is the leather wallet still available?',
    timestamp: '2025-03-15T15:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    senderId: 'user-1',
    receiverId: 'user-2',
    content: 'Yes, it\'s still available! Are you interested in purchasing?',
    timestamp: '2025-03-15T16:05:00Z',
    read: true
  },
  {
    id: 'msg-3',
    senderId: 'user-2',
    receiverId: 'user-1',
    content: 'Great! I\'d like to buy it. How do we proceed with the escrow?',
    timestamp: '2025-03-15T16:10:00Z',
    read: false
  }
];

// Populating the listings for each user
const user1Products = mockProducts.filter(product => product.sellerId === 'user-1');
const user2Products = mockProducts.filter(product => product.sellerId === 'user-2');
const user3Products = mockProducts.filter(product => product.sellerId === 'user-3');

mockUsers[0].listings = user1Products;
mockUsers[1].listings = user2Products;
mockUsers[2].listings = user3Products;