import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

function CategoryProducts({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
      .then(response => {
        setCategory(response.data.data);
      })
      .catch(error => {
        console.log( error);
      });
  }, [categoryId]);

  if (!category) {
    return <div className="flex justify-center items-center h-screen w-full">
      <Loading />
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="py-12">
          <h1 className="text-3xl font-extrabold text-gray-900">{category.name}</h1>
          <div className="mt-4">
            <img src={category.image} alt={category.name} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
