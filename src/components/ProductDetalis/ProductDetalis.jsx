import React, { useContext, useEffect } from 'react';
import Style from './ProductDetalis.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import useProductDetalis from '../../Hooks/useProductDetalis';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function ProductDetalis() {

    let {addToCart} =   useContext(CartContext)
 
  function addProductToCart(productId){
    addToCart(productId)
    .then(response => {
      if (response.data.status === "success") {
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
  useEffect(() => {
  window.scrollTo(0, 0);
    
  }, []);
    const { id, category } = useParams();
    
    async function getProductDetails() {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      return response.data.data;
  }
  
  async function getRelatedProduct() {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      return response.data.data.filter(product => product.category.name === category);
  }

    let 
      { 
        data: productDetails,
        isLoading: isProductLoading,
      } = useProductDetalis(['productDetails', id], getProductDetails);
    let 
      { 
        data: relatedProduct =[],
        isLoading: isRelatedLoading 
      } = useProductDetalis(['relatedProduct', category], getRelatedProduct);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <ul>
                {dots.slice(0, 3)}
            </ul>
        ),
        
    };

    const relatedProductsSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        arrows: true,
        appendDots: dots => (
            <ul>
                {dots.slice(0, 6)}
            </ul>
        ),
        responsive: [
            {
              breakpoint: 1024, 
              settings: {
                slidesToShow: relatedProduct?.length >= 4 ? 4 : relatedProduct.length,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 768, 
              settings: {
                slidesToShow: relatedProduct?.length >= 3 ? 3 : relatedProduct.length,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 480, 
              settings: {
                slidesToShow: relatedProduct?.length >= 2 ? 2 : relatedProduct.length,
                slidesToScroll: 1,
              }
            }
          ]
    };

    if (isProductLoading || isRelatedLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Loading/>
            </div>
        );
    }

    return (
        <>
        <Helmet>
            <title>{productDetails?.title}</title>
            <meta name="description" content={productDetails?.description} />
        </Helmet>
            <div className="row ">
                <div className='w-full px-4 md:px-0 md:w-1/4'>
                    <Slider {...settings}>
                        {productDetails?.images.map((src, index) => <img key={index} className='w-full p-10' src={src} alt={productDetails?.title} />)}
                        <img className='w-full p-10' src={productDetails?.imageCover} alt={productDetails?.title} />
                    </Slider>
                </div>
                <div className='w-full md:w-3/4 p-6 py-12 flex flex-col content-between '>
                    <h1 className='text-center md:text-left text-lg font-semibold text-gray-800'>{productDetails?.title}</h1>
                    <p className='text-gray-600 text-lg mt-4 w-full'>{productDetails?.description}</p>
                    <div className="flex justify-between items-center py-6 px-2">
                        <span className='text-lg'>{productDetails?.price} EGP</span>
                        <span className='flex items-center gap-x-[.20rem] text-lg'>{productDetails?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                    </div>
                    <button onClick={() => addProductToCart(productDetails.id)} className='btn mb-2 w-full'>Add to Cart </button>
                </div>
            </div>

            <div className='w-full py-12 px-4 overflow-hidden'>
                <Slider {...relatedProductsSliderSettings}>
                    {relatedProduct.map((product) => (
                        <div key={product?.id} className=''>
                            <div className='product overflow-hidden px-4'>
                                <Link to={`/productdetails/${product?.id}/${product?.category.name}`}>
                                    <img className='w-full' src={product?.imageCover} alt={product?.title} />
                                    <span className='block mt-2 font-light text-green-600'>{product?.category?.name}</span>
                                    <h3 className='text-lg font-normal mb-4 mt-1 text-gray-700'>{product?.title.split(' ').slice(0, 2).join(' ')}</h3>
                                    <div className="flex justify-between items-center">
                                        <span>{product?.price} EGP</span>
                                        <span className='flex items-center gap-x-1'>{product?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                                    </div>
                                </Link>
                                
                                    <button onClick={() => addProductToCart(product?.id)} className='btn mb-2'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}
