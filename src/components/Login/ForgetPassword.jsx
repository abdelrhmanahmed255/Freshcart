import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import VerifyCode from './VerifyCode';

export default function ForgetPassword() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  function handleForget(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then((response) => {
        setIsLoading(false);
        toast.success(response.data.message, {
          duration: 2000,
        });
        if (response.data.statusMsg === 'success') {
          setIsCodeSent(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response?.data?.message);
      });
  }

  const validinputs = yup.object({
    email: yup.string().email("Email is not valid").required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validinputs,
    onSubmit: handleForget,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Forget password page" />
      </Helmet>
      {!isCodeSent ? (
        <form className="max-w-sm md:max-w-5xl mx-auto mt-12" onSubmit={formik.handleSubmit}>
          {apiError && <div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{apiError}</div>}
          <div className="mb-5 mt-5 w-full">
            <label htmlFor="email" className="block mb-2 text-xl md:text-3xl ps-1 font-bold text-gray-600 dark:text-white">Please enter your verification Email:</label>
            <input type="email" id="email" className="shadow-sm bg-gray-50 border py-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@freshcart.com"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.email}</div>) : ""}
          </div>
          <div className='w-full flex justify-end'>
            <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify"}
            </button>
          </div>
        </form>
      ) : (
        <VerifyCode />
      )}
    </>
  );
}
