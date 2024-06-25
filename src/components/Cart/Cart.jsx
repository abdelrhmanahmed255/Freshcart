import React, { useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';

export default function Cart() {
  let { getCartItems , removeItem , updateItem , clearCart ,setCart,cart}= useContext(CartContext);
  const [cartDetails,setCartDetails] = useState(null);
  const [cartLoad,setCartLoad] = useState(null);
  const [cartCount, setCartCount] = useState(null);
  useEffect(() => {

    setCartLoad(true); 
    getCartItems()
      .then(response => {
        setCartDetails(response.data);
        setCartCount(response?.data?.numOfCartItems);
        setCartLoad(false); 
      })
      .catch(error => {
        console.log( error);
        setCartLoad(false); 
      });
  }, []);
 function deleteCartItems(productId){
    removeItem(productId)
   .then((response)=> {
    setCartDetails(response?.data);
    setCartCount(response?.data.numOfCartItems);
    toast.error('Product removed', {duration: 2000,});
  })
   .catch((error)=>   console.log(error)) 
  }
  function updateCartItems(productId,productCount){
    if (productCount < 1) {
      deleteCartItems(productId);
      return;
    }
    updateItem(productId , productCount)
    .then((response)=> { setCartDetails(response?.data)})
    .catch((error)=>   console.log(error)) 
  }
  function clearCartItems(){
    setCartLoad(true);
    clearCart()
   .then((response)=> {if (response?.data.message ==="success") 
    {setCartDetails(null);
      // setCartCount(response?.data.numOfCartItems);
      setCart(response?.data)
      toast.error('Cart cleared', {duration: 2000,});
    }
    setCartLoad(false);
  })
    .catch((error)=> {  
      console.log(error)
      setCartLoad(false);
    })
  }

    useEffect(()=>{
      window.scrollTo(0, 0);
     const getCartCount = async () => {
      const response = await getCartItems();
      setCartCount(response?.data?.numOfCartItems);
    };
    getCartCount();
  },[cartDetails])
  
  if (cartLoad) {
    return <div className="flex justify-center items-center h-screen w-full">
      <Loading />
    </div>;
  }

  return (
    <>
  <Helmet>
    <title>Cart</title>
    <meta name="description" content="Cart" />
  </Helmet>
    <section className="py-24 relative">
  <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
    <div className="hidden bg-gray-50 lg:grid grid-cols-2 py-3 rounded-lg">
      <div className="font-normal text-xl leading-8 ms-8 text-gray-700">Product</div>
      <p className="font-normal text-xl leading-8 text-gray-700 flex items-center justify-center">
        <span className="w-full max-w-[260px] md:ms-10  text-center">Quantity</span>
        <span className="w-full max-w-[260px] md:ms-10  text-center">Total</span>
        <span className="w-full max-w-[260px]   text-center">Action</span>
      </p>
    </div>

    {cartDetails?.data?.products?.map((product) => (
      <div key={product?.product?.id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
        <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
          <div className="img-box">
            <Link to={`/productdetails/${product?.product.id}/${product?.product.category.name}`}>
              <img src={product.product.imageCover} alt="perfume bottle image" className="w-1/2 mx-auto md:mx-0 xl:w-[140px]" />
            </Link>
          </div>
          <div className="pro-data w-full max-w-sm ">
            <Link to={`/productdetails/${product?.product.id}/${product?.product.category.name}`}>
              <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                {product.product.title.split(' ').slice(0, 10).join(' ')}
              </h5>
            </Link>
            <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
              {product.product.category.name}
            </p>
            <h6 className="font-medium text-lg leading-8 text-green-500 max-[550px]:text-center">
              {product.price} <span className='text-black font-bold text-[10px]'>EGP</span>
            </h6>
          </div>
        </div>

        <div className="flex flex-col  md:flex-row    items-center w-full mx-auto  ">
          <div className="flex  items-center">
            <button onClick={() => updateCartItems(product?.product?.id, product?.count - 1)} className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 bg-gray-100 hover:bg-gray-200">
              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                <path d="M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <span className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent">
              {product.count}
            </span>
            <button onClick={() => updateCartItems(product?.product?.id, product?.count + 1)} className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 bg-gray-100 hover:bg-gray-200">
              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                <path d="M11 5.5V16.5M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 5.5V16.5M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 5.5V16.5M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <h6 className="text-green-500 font-manrope font-bold text-2xl leading-9 w-full md:ms-8 max-w-[176px] text-center">
            {product.count * product.price} <span className='text-gray-600 font-semibold text-[16px]'>EGP</span>
          </h6>
          <div className='w-full text-center'>
            <span onClick={() => deleteCartItems(product?.product?.id)} className=" font-medium text-2xl cursor-pointer text-red-600 dark:text-red-500 hover:text-red-600">
            <i className="fa-solid fa-trash-can"></i>
            </span>
          </div>
        </div>
      </div>
    ))}
    
    {cartDetails?.data?.products?.length > 0 ? (
      <>
      <div className="bg-gray-50 rounded-xl p-6 w-full mb-6 max-lg:max-w-xl max-lg:mx-auto">
      <div className="flex items-center justify-between w-full py-6 px-2">
        <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
        <h6 className="font-manrope font-semibold text-2xl leading-9 text-green-500">{cartDetails?.data?.totalCartPrice} <span className='text-gray-600 font-bold text-[22px]'>EGP</span></h6>
      </div>
    </div>
    <div>
          <Link to={'/checkout'}>
          <div className="bg-green-500 rounded-xl px-6 py-2 text-white text-2xl text-center w-full mx-auto mb-8 max-lg:max-w-xl max-lg:mx-auto">Check Out </div>
          </Link>
        </div>
    <button onClick={clearCartItems} className='bg-red-600 px-6 py-4 rounded-md text-white block ms-auto  mt-6 hover:bg-red-800'>Clear Cart</button>
   </> 
  ) : (
            <div className='text-center p-20 pt-16'>
              <h1 className='text-xl font-semibold mb-8 text-gray-500'>There are no items yet.</h1>
              <Link to={"/products"} className='bg-green-500 text-white px-8 py-4 rounded-xl text-lg hover:text-white hover:bg-green-600'>Add your first product to cart</Link>
            </div>
          )}
        </div>
        
      </section>
    </>
  );
}
 
    
 

                                    