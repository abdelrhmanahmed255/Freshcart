import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  };
    
    let [cart ,setCart] = useState(null);

    let [wishlist ,setWishlist] = useState([]);

  async function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: productId }, 
        {  headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCartItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
      .then((response) => { 
       setCart(response?.data);
        return response
    })
      .catch((error) => error);
    }
  useEffect(() => {
   
  }, [cart]);
  

  async function removeItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: headers })
      .then((response) => {
        setCart(response?.data);
        return response
      })
      .catch((error) => error);
  }

  async function updateItem(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
        { count: count }, { headers: headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
      .then((response) => {
        setCart(response?.data);
        return response
      })
      .catch((error) => error);
  }

  async function addToWishlist(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: productId },
         { headers: headers })
      .then((response) => {
        setWishlist((userWishlist) => [...userWishlist, response?.data]);
        return  response ;
        })
      .catch((error) => error);
  }

  async function getWishlistItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: headers })
      .then((response) =>{
        setWishlist(response?.data?.data);
          return response;
        }
    )
      .catch((error) => error);
  }

  async function removeWishlistItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: headers })
      .then((response) => {
        setWishlist((userWishlist) => userWishlist.filter(item => item.id !== productId));
      return  response ;
      })
      .catch((error) => error);
  }

  return (
    <CartContext.Provider value={{ setCart, cart, wishlist,setWishlist ,addToCart, getCartItems, removeItem, updateItem, clearCart, addToWishlist, getWishlistItems, removeWishlistItem }}>
      {props.children}
    </CartContext.Provider>
  );
}
