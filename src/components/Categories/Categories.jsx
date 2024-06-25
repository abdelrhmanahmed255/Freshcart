import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(response => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log( error);
        setLoading(false); 
      });
  }, []);

  return (
    <>
     <Helmet>
    <title>categories</title>
    <meta name="description" content="categories page" />
  </Helmet>
  {loading ? (
     <div className="flex justify-center items-center h-screen w-full">
      <Loading />
    </div>)
   : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-6 lg:px-28 mt-14">
      {categories.map(category => (
        <Link className='py-2' to={`/categories/${category._id}`} key={category._id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg max-h-96">
            <img src={category.image} alt={category.name} className="w-full max-h-80" />
            <div className="p-4">
              <p className="text-center font-semibold text-lg">{category.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
      )}
    </>
  );
}

export default Categories;
