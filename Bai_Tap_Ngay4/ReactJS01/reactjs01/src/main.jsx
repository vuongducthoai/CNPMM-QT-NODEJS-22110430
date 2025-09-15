// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HomePage from './pages/home.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import LoginPage from './pages/login.jsx';
import ProductList from './components/layout/ProductDetail/product.jsx'; // Import the ProductList component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthWrapper } from './components/context/auth.context.jsx';
import '../src/styles/global.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component handles the header and outlet
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "products", 
        element: <ProductList />, 
      },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);