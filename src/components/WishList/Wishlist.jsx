import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';

export default function Wishlist() {
  const { getWishlistItems, removeWishlistItem ,addToCart } = useContext(CartContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoad, setWishlistLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    addToWishlistItems();

  }, []);

  const addToWishlistItems = () => {
    setWishlistLoad(true);
    getWishlistItems()
      .then(response => {
        setWishlistItems(response?.data?.data); 
        setWishlistLoad(false);
      })
      .catch(error => {
        console.log(error);
        setWishlistLoad(false);
      });
  };

  const removeFromWishlist = (productId) => {
    removeWishlistItem(productId)
      .then((response) => {
        const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
        setWishlistItems(updatedWishlist);
        toast.error('Product removed from wishlist', { duration: 2000 });
      })
      .catch(error => console.log(error));
  };
  const addProductToCart = (productId) => {
    addToCart(productId)
      .then(response => {
        console.log(response.data?.status);
        console.log(productId);
        if (response.data?.status === "success") {
          toast.success('Product added successfully to your cart', {
            duration: 2000,
          });
        }
      })
      .catch(error => {
        toast.error('An error occurred', {
          duration: 2000,
        });
      });
  }
  

  if (wishlistLoad) {
    return <div className="flex justify-center items-center h-screen w-full"><Loading /></div>;
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="Wishlist" />
      </Helmet>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
            <>
              <div className="hidden bg-gray-50 lg:grid grid-cols-3 py-3 rounded-lg">
                <div className="font-normal text-xl leading-8 ms-8 text-gray-700">Product</div>
                <div className="font-normal text-xl leading-8 text-gray-700 flex items-center justify-center">Price</div>
                <div className="font-normal text-xl leading-8 text-gray-700 flex items-center justify-center">Action</div>
              </div>
              {wishlistItems?.map((product) => (
                <div key={product._id} className="grid grid-cols-1 lg:grid-cols-3 gap-6  py-6">
                  <div className="flex items-center gap-3 lg:gap-6">
                    <div className="img-box">
                      <Link to={`/productdetails/${product?._id}/${product?.category}`}>
                        <img src={product?.imageCover} alt="product image" className="w-[300px]" />
                      </Link>
                    </div>
                    <div className="pro-data">
                      <Link to={`/productdetails/${product._id}/${product.category}`}>
                        <h5 className="font-semibold text-xl leading-8 text-black">{product?.title.split(' ').slice(0, 5).join(' ')}</h5>
                        <p className="text-sm leading-8 text-gray-500">{product?.description.split(' ').slice(0, 10).join(' ')}</p>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <h6 className="font-medium text-3xl leading-8 text-green-500">
                      {product.price} <span className='text-black font-bold text-[20px]'>EGP</span>
                    </h6>
                  </div>
                  <div className="flex items-center justify-center md:justify-around ">
                    <button onClick={() => removeFromWishlist(product._id)} className="bg-red-600 px-2 me-2 md:me-0 py-2 rounded-2xl text-white hover:bg-red-800">
                        Remove <i class="fa-solid fa-trash"></i>
                        </button>
                    <button onClick={() => addProductToCart(product.id)} className="bg-green-600 px-2 py-2 rounded-2xl text-white hover:bg-green-800">
                        Move to Cart <i className="fa-solid fa-cart-shopping text-md align-middle"></i> 
                        </button>
                  </div>
                </div>
              ))}
            </>
            {!wishlistLoad && wishlistItems.length === 0 && (
                   <div className='text-center p-20 pt-16'>
                <h1 className='text-xl font-semibold mb-8 text-gray-500'>Your wishlist is empty.</h1>
                <Link to={"/products"} className='bg-green-500 text-white px-8 py-4 rounded-xl text-lg hover:text-white hover:bg-green-600'>Start adding products to your wishlist</Link>
              </div>
             )}
         
        </div>
      </section>
    </>
  );
}
