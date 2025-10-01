import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication status using cookies
    const checkAuth = async () => {
      try {
        // Configure axios to send cookies with request
        const response = await api.get('/admin/countries');
        
        // If request succeeds, user is authenticated
        setIsAuthenticated(true);
      } catch (error) {
        // If request fails, user is not authenticated
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/login', {
        email,
        password
      });
      
      // With cookie authentication, we don't need to store tokens
      // The cookie is automatically sent with subsequent requests
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear the cookie
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Update authentication state
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};