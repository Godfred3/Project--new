import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

const CreateListingPage: React.FC = () => {
  const { currentUser, createListing } = useApp();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair' | 'poor'>('new');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!condition) newErrors.condition = 'Condition is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      createListing({
        title,
        description,
        price: Number(price),
        currency: 'ICP',
        images,
        category,
        condition,
        location,
      });
      
      navigate('/my-listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Example categories
  const categories = ['Electronics', 'Furniture', 'Fashion', 'Books', 'Sports', 'Art', 'Collectibles', 'Other'];
  
  // Condition options
  const conditions: { value: 'new' | 'like-new' | 'good' | 'fair' | 'poor'; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Create New Listing</h1>
          <p className="text-gray-600">
            List your item on the FleaChain marketplace
          </p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {errors.submit && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}
            
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows={4}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Price (ICP)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={errors.price}
                fullWidth
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className={`w-full px-3 py-2 border ${
                    errors.condition ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {conditions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                )}
              </div>
              
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
                fullWidth
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="flex">
                <Input
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddImage}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images}</p>
              )}
              
              {images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="mt-1 text-xs text-gray-500">
                Add URLs of images for your product. The first image will be used as the main image.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Create Listing
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateListingPage;