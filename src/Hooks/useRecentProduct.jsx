import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useRecentProduct(queryKey, queryFn) {
    const responseObject = useQuery({
      queryKey,
      queryFn,
    });
  
    return responseObject;
  }
