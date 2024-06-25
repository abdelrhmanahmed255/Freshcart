import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import './RecentProduct.module.css';

export default function RecentProduct() {
  const { addToCart, addToWishlist, removeWishlistItem, getWishlistItems,setCart,cart, setWishlist, wishlist } = useContext(CartContext);
  const [addToCartLoading, setAddToCartLoading] = useState(null);

  useEffect(() => {
    getWishlistItems().catch(error => {
      console.error('Error fetching wishlist items:', error);
    });
  }, [getWishlistItems]);

  const addProductToCart = (productId) => {
    setAddToCartLoading(productId);
    addToCart(productId)
      .then(response => {
        if (response.data?.status === "success") {
          setCart(response.data);
          toast.success('Product added successfully to your cart', { duration: 2000 });
        }
        setAddToCartLoading(null);
      })
      .catch(error => {
        setAddToCartLoading(null);
        console.log(error);
        toast.error('An error occurred', { duration: 2000 });
      });
  };

  const toggleWishlist = (productId) => {
    if (wishlist.some(item => item.id === productId)) {
      removeWishlistItem(productId)
        .then(response => {
          if (response.data.status === "success") {
            toast.error('Product removed from Wishlist', { duration: 2000 });
          }
        })
        .catch(error => {
          toast.error('An error occurred while removing from Wishlist', { duration: 2000 });
        });
    } else {
      addToWishlist(productId)
        .then(response => {
          if (response.data?.status === "success") {
            toast.success('Product added to Wishlist', { duration: 2000 });
          }
        })
        .catch(error => {
          toast.error('An error occurred while adding to Wishlist', { duration: 2000 });
        });
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  async function getRecentProduct() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getRecentProduct,
  });

  if (isLoading || isFetching) {
    return <div className="flex justify-center items-center h-screen w-full">
      <Loading />
    </div>;
  }


  return (
    <>
      <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
        {data?.data.data.map((product) => (
          <div key={product.id} className='py-6 px-4'>
            <div className='product overflow-hidden px-4'>
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img className='w-full ' src={product.imageCover} alt={product.title} />
                <span className='block mt-2 font-light text-green-600'>{product.category.name}</span>
              </Link>
              <div className='flex justify-between'>
                <h3 className='text-lg font-normal mb-4 mt-1 text-gray-700'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <i onClick={() => toggleWishlist(product.id)}
                  className={`fa-heart cursor-pointer text-2xl mt-1 
                    ${isProductInWishlist(product.id) ? 'fa-solid text-red-600' : 'fa-regular'}`}></i>
              </div>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span className='flex items-center gap-x-[.20rem]'>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
              </div>
              <button onClick={() => addProductToCart(product.id)} className='btn mb-2'>
                {addToCartLoading === product.id ? (<i className='fa-solid fa-spinner fa-spin'></i>) : (
                  <>Add to Cart <i className="fa-solid fa-cart-shopping text-xl text-white align-middle"></i></>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
