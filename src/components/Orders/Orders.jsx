import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      axios.get('https://ecommerce.routemisr.com/api/v1/orders/')
        .then((response) => {
          setOrders(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    };
  
    fetchOrders();
  }, []);
  

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-full">
    <Loading />
  </div>;
  }

  return (
    <>
    <Helmet>
        <title>All Orders</title>
        <meta name="description" content="orders" />
      </Helmet>
    <div className="container mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center ">Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow-md rounded-md p-4 mb-4 w-3/4 mx-auto md:relative">
          <div className="flex justify-between mb-2">
            <div className="text-gray-600"><span className='font-semibold'>Order ID:</span> {order._id}</div>
             
          </div>
          <div className="text-gray-700 mb-2"><span className='font-semibold'>Total Order Price:</span> {order.totalOrderPrice} EGP</div>
          <div className='flex  md:absolute md:top-5 md:right-2 '>
              <div className={`me-2 ${order.isPaid ? 'text-green-500' : 'bg-red-500 rounded-lg text-white px-4 py-2 text-sm'}`}>{order.isPaid ? 'Paid' : 'Not Paid'}</div>
              <div className={`${order.isDelivered ? 'text-green-500' : 'bg-blue-500 rounded-lg text-white px-4 py-2 text-sm'}`}>{order.isDelivered ? 'Delivered' : 'Under Delivery'}</div>
              </div>
          <div className="flex flex-wrap gap-4">
            {order.cartItems.map((item) => (
              <div key={item._id} className="bg-white shadow-md rounded-md p-2 w-full sm:w-auto">
                <img src={item.product.imageCover} alt={item.product.title} className="md:w-24 mx-auto h-60 md:h-auto mb-2" />
                <div className="text-sm text-center font-semibold">{item.product?.title.split(' ').slice(0, 2).join(' ')}</div>
                <div className="text-sm text-center text-gray-500">{item.price} EGP</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Orders;
