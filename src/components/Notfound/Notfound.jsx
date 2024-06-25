import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import img404 from '../../assets/images/219918-P1D0HC-507.jpg'
import { Helmet } from 'react-helmet';


export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <Helmet>
    <title>Not Found</title>
    <meta name="description" content="404 page" />
  </Helmet>
   <div className="container px-60 mx-auto my-2 pt-6 w-3/4">
    <img className='w-full' src={img404} alt="" />
   </div>
   </>
}
