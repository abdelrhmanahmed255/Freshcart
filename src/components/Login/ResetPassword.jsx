import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    return () => {
      localStorage.removeItem('userCode');
    };
  }, []);

  function handleResetpassword(values) {
    setIsLoading(true);
    const userNewData = {
        email: values.email,
        newPassword: values.newPassword,
      };
      console.log('Payload:', userNewData);
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, userNewData ) 
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        toast.success(response.data.message, { duration: 2000 });
        formik.resetForm();
        navigate('/login')
        localStorage.removeItem('userCode');
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response?.data?.statusMsg || "An error occurred", { duration: 2000 });
        setApiError(error.response?.data?.message);
      });
  }

  const validinputs = yup.object({
    email: yup.string().required("email is required").email("email is not valid"),
    newPassword: yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
        email: "",
        newPassword: "",
    },
    validationSchema: validinputs,
    onSubmit: handleResetpassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Forget password page" />
      </Helmet>
     
      <form className="max-w-sm md:max-w-2xl mx-auto mt-12" onSubmit={formik.handleSubmit}>
        {apiError && <div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{apiError}</div>}
        <div className="mb-5 mt-5 w-full">
          <label htmlFor="email" className="block mb-2 text-xl ps-1 font-bold text-gray-600 dark:text-white">Please enter your verification email:</label>
          <input type="text" id="email" className="shadow-sm bg-gray-50 border py-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your email"
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.email}</div>) : ""}
        </div>
        <div className="mb-5">
        <label htmlFor="newPassword" className="block mb-2 text-xl font-bold text-gray-600 dark:text-white">New Password:</label>
        <input type="password" id="newPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name='newPassword'
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.newPassword}</div>) : ""}
      </div>
        <div className='w-full flex justify-end'>
          <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Update"}
          </button>
        </div>
      </form>
    </>
  );
}
