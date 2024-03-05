// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserOutput } from './DBtypes'; // Ensure this path matches your project structure

// Define the shape of the context
interface AuthContextType {
  user: UserOutput | null;
  token: string | null;
  login: (data: { token: string; user: UserOutput }) => void;
  logout: () => void;
}

// Create the context with an initial null value
const AuthContext = createContext<AuthContextType | null>(null);

// Define props for the provider for type checking
interface AuthProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserOutput | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (loginResponse: { token: string; user: UserOutput }) => {
    const { token, user } = loginResponse;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    console.log('User set in AuthProvider:', user);
    console.log('Token set in AuthProvider:', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};