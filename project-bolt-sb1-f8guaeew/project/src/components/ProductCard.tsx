import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { Card, CardImage, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  // Format the price with the currency
  const formattedPrice = `${product.price} ${product.currency}`;
  
  // Get the first image for the card
  const mainImage = product.images.length > 0 ? product.images[0] : '';
  
  // Badge color based on product status
  const statusBadgeVariant = 
    product.status === 'active' ? 'success' : 
    product.status === 'pending' ? 'warning' : 'default';
  
  // Format the listing date
  const listedDate = new Date(product.createdAt).toLocaleDateString();
  
  return (
    <Card hoverable className="h-full flex flex-col" onClick={handleClick}>
      <div className="relative">
        <CardImage 
          src={mainImage} 
          alt={product.title} 
          className="h-48"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={statusBadgeVariant}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category} • {product.condition}</p>
        <p className="text-gray-700 text-sm line-clamp-2 mb-2">{product.description}</p>
        <p className="text-gray-500 text-xs">Listed on {listedDate}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-800">{formattedPrice}</span>
        <span className="text-sm text-gray-500">{product.location}</span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;