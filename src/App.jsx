import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetalis from './components/ProductDetalis/ProductDetalis';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast'
import ForgetPassword from './components/Login/ForgetPassword';
import ResetPassword from './components/Login/ResetPassword';
import CategoryProducts from './components/CategoryProudct/CategoryProudct';
import BrandProducts from './components/BrandProduct/BrandProduct';
import Wishlist from './components/WishList/Wishlist';
import CheckOut from './components/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';
import PasswordProtected from './components/ProtectedRoute/PasswordProtected';



const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'brands/:id', element: <ProtectedRoute><BrandProducts /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'categories/:id', element: <ProtectedRoute><CategoryProducts /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute> <ProductDetalis /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element:<PasswordProtected><ResetPassword /></PasswordProtected>  },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    
    <CartContextProvider>  
      <QueryClientProvider client={query}>
    <UserContextProvider>
      <RouterProvider router={router} basename="/Freshcart"></RouterProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </UserContextProvider>
  </QueryClientProvider>
   </CartContextProvider>
   
  
  );
}

export default App;
