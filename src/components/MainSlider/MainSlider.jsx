import React, { useContext, useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import mainslide from '../../assets/images/slider-image-3.jpeg'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useRecentProduct from '../../Hooks/useRecentProduct';



export default function MainSlider() {



  async function getRecentProduct(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
   }
  
   let { error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getRecentProduct,
 
  });

   var settings = {
     dots: true,
     infinite: true,
     speed: 800,
     slidesToShow: 1, 
     slidesToScroll: 1,
     autoplay: false,
     arrows:false,
     
    };
    if(isLoading || isFetching){
      return null
    }
    
    return <>
    <div className="row mt-4 lg:mt-0  ">
      <div className='md:w-3/4 w-full '>
      <Slider {...settings}>
        <img className='w-fit h-[200px] lg:h-[400px] ' src={mainslide} alt="slideimg" />
        <img className='w-fit h-[200px] lg:h-[400px] ' src={mainslide} alt="slideimg" />
        <img className='w-fit h-[200px] lg:h-[400px] ' src={mainslide} alt="slideimg" />
      </Slider>
      </div>
      <div className='md:w-1/4 w-full mt-6 md:mt-0'>
      <img className='object-cover w-full h-[160px] lg:h-[200px]' src={slide1} alt="slideimg" />
      <img className='object-cover w-full mt-4 md:mt-0 h-[150px] lg:h-[200px]' src={slide2} alt="slideimg" />
      </div>
    </div>
   
  </>
}
