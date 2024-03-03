import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { AuthProvider } from './types/AuthContext.tsx'; // Ensure this import path is correct

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider> {/* Wrap your app with AuthProvider */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
