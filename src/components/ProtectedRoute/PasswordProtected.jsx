import React, { useEffect, useState } from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';


export default function PasswordProtected(props) {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
    if(localStorage.getItem('userCode')!== null){
     return props.children
    }else{

    return <Navigate to={'/login'} />
    }

  
}
