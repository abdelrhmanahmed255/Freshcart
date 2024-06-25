import React, { useEffect, useState } from 'react';
import Style from './Products.module.css';
import RecentProduct from '../RecentProduct/RecentProduct';
import { Helmet } from 'react-helmet';


export default function Products() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <Helmet>
    <title>Product</title>
    <meta name="description" content="product" />
  </Helmet>
      <RecentProduct></RecentProduct>
        </>
}
