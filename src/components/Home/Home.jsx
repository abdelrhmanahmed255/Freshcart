import React, { useContext, useEffect, useState } from 'react';
import Style from './Home.module.css';
import RecentProduct from '../RecentProduct/RecentProduct';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from './../MainSlider/MainSlider';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';




export default function Home() {
    const [counter, setCounter] = useState(0);
  return <>
  <Helmet>
    <title>Home</title>
    <meta name="description" content="Home" />
  </Helmet>

  <MainSlider/>
  <CategorySlider></CategorySlider>
  <RecentProduct></RecentProduct>
  </>
       
}
