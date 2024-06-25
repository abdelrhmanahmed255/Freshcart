import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';



function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(response => {
        setBrands(response.data.data);
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
    <title>Brands</title>
    <meta name="description" content="Brands page" />
  </Helmet>
      {loading ? (
     <div className="flex justify-center items-center h-screen w-full">
      <Loading />
    </div>)
   : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 px-6 lg:px-28 mt-14">
      {brands.map(brand => (
        <Link to={`/brands/${brand._id}`} key={brand._id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md max-h-96">
            <img src={brand.image} alt={brand.name} className="w-full max-h-80" />
            <div className="p-4">
              <p className="text-center font-medium text-lg">{brand.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
   )}
    </>
  );
}

export default Brands;
