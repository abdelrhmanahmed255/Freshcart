import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import useRecentProduct from '../../Hooks/useRecentProduct';
import Notfound from '../../components/Notfound/Notfound';


export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
 
  function getCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then(({data})=>{
      setCategories(data?.data)
    })
    .catch((error)=>{error})
  }
  
  let { error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getCategories, 
  });

  useEffect(() => {
    getCategories(); 
  }, );

  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: categories?.length >= 8 ? 8 : categories.length, 
    slidesToScroll: 3,
    autoplay: true,
    
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: categories?.length >= 6 ? 6 : categories.length,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: categories?.length >= 3 ? 3 : categories.length,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: categories?.length >= 2 ? 2 : categories.length,
          slidesToScroll: 1,
        }
      }
    ]
    
 
  };
  
  

  if(isLoading || isFetching){
    return null
  }
  if (isError) {
    return <Notfound></Notfound>
  }

  return (
    <div className='pb-5 pt-3 px-4 overflow-hidden'>
      <h2 className= {`py-4 text-gray-800 text-xl font-medium  ${isLoading ? "hidden" : "block"}`}>Shop popular <span className='text-green-600 font-semibold ' >categories</span></h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id}>
            <img className='categoryImg w-full ' src={category?.image} alt={category?.name} />
            <h3 className='mt-2 text-center text-sm font-semibold text-gray-800 '>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
