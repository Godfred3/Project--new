import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/marketplace');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes - set preset usernames
  const handleDemoLogin = async (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword('password'); // In a real app, we'd never do this
    setIsLoading(true);
    
    try {
      const success = await login(demoUsername, 'password');
      if (success) {
        navigate('/marketplace');
      } else {
        setError('Demo login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-12 w-12 text-blue-800" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sign in to FleaChain</h2>
          <p className="mt-2 text-gray-600">
            Secured by Internet Identity
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or try a demo account</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('AliceBlockchain')}
              className="w-full"
            >
              Alice
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('BobCrypto')}
              className="w-full"
            >
              Bob
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('CharlieNFT')}
              className="w-full"
            >
              Charlie
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-800 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;