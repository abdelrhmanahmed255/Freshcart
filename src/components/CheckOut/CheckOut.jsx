import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function CheckOut() {

    let {cart , setCart}= useContext(CartContext);
    const [orderType, setOrderType] = useState(null);

    let headers = {
        token: localStorage.getItem('userToken')
      };

    function createCashOrder(values) {
      const cartId = cart?.data?._id;
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values,
            { headers })
          .then((response) => {
            if (response?.status === 200 || response?.data?.status === "success") {
              formik.resetForm();
              toast.success('success cash payment', {
                duration: 2000,
              });
              setCart([]);
            
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
      function createOnlineOrder(values) {
        const cartId = cart?.data?._id;
          axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, values,
              { headers })
            .then((response) => {
              if (response?.status === 200 || response?.data?.status === "success") {
                formik.resetForm();
                toast.loading('Redirect to payment gateway', {
                  duration: 2000,
                });
                setTimeout(()=>{
                  window.location.href = response?.data?.session?.url
                },2000);
           
              }
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        

        }
    let formik = useFormik({
        initialValues: {
            shippingAddress:{
            details: '',
            phone: '',
            city: '',
        },
    },
        onSubmit: (values)=>{
          if(orderType == 'cash') createCashOrder(values);
          else if(orderType == 'online') createOnlineOrder(values);
         
        },
      });
    

  return (
   <>
   <h2 className='text-2xl font-semibold text-center text-gray-600 mt-12'>Shipping Address</h2>
   <form className='flex flex-col w-3/4 mx-auto mt-5' onSubmit={formik.handleSubmit}>
   <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-4" placeholder="Enter your Address" 
      name='shippingAddress.city'
      value={formik.values.shippingAddress.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
   />
   <input type='tel' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-4 mt-4" placeholder="Enter your phone" 
     name='shippingAddress.phone'
     value={formik.values.shippingAddress.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
   />

   <textarea className="shadow-sm mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-6 " placeholder="Details" 
      name='shippingAddress.details'
      value={formik.values.shippingAddress.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}>
   </textarea>
 <div className='flex-col mt-2'>
 <button
 onClick={()=>{
  setOrderType('cash')
 }} 
 type='submit' className='px-4 py-2 w-full rounded-lg text-white bg-green-500 '>Cash Order</button>
 <button
 type='submit'
 onClick={()=>{
  setOrderType('online')
 }} 
 className='px-4 py-2 w-full rounded-lg text-white bg-blue-500 mt-2'>Online Order</button>
 </div>
   </form>
   </>
  )
}
