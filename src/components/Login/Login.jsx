import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { setUserLogin , setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((response) => {
        setIsLoading(false);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userName', response.data.user.name);
        setUserLogin(response.data.token);
        setUserName(response.data.user.name);
        formik.resetForm();
        navigate('/Freshcart'); 
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response?.data?.message);
      });
  }

  const validinputs = yup.object({
    email: yup.string().required("Email is required").email("Email is not valid"),
    password: yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validinputs,
    onSubmit: handleLogin,
  });

  return (
    <>
    <Helmet>
    <title>Login</title>
    <meta name="description" content="login page" />
  </Helmet>
    <form className="max-w-sm md:max-w-xl mx-auto mt-12" onSubmit={formik.handleSubmit}>
      <h1 className='text-green-500 text-3xl font-semibold text-center'>Login Now</h1>
      {apiError && <div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{apiError}</div>}
      <div className="mb-5 mt-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@yahoo.com"
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.email}</div>) : ""}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
        <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.password}</div>) : ""}
      </div>
      <div className='w-full flex justify-start mt-3 text-gray-500'><Link className='ps-2 text-sm text-gray-700 font-bold ' to="/forgetpassword"> forget your password ?</Link>
      </div>

      <div className='w-full flex justify-end'>
        <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
        </button>
      </div>
      <div className='w-full flex justify-center mt-3 text-gray-500'>Don't have an account? <Link className='ps-2 text-gray-700 font-bold' to="/register"> Signup</Link>
      </div>
      
    </form>
    </>
  );
}
