import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate(); 

  function submitForm(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((response) => {
        if (response.data.message == "success") {
          setIsLoading(false);
          setApiSuccess(response.data.message);
          formik.resetForm();
          navigate('/login'); 
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response?.data?.message);
        console.log("Error:", error);
      });
  }

  const validinputs = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters"),
    email: yup.string().required("Email is required").email("Email is not valid"),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number"),
    password: yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with an uppercase letter and be between 5 to 10 characters"),
    rePassword: yup.string().required("Repeat Password is required").oneOf([yup.ref("password")], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validinputs,
    onSubmit: submitForm,
  });

  return (
    <>
      <Helmet>
    <title>Register</title>
    <meta name="description" content="Register Page" />
    </Helmet>
      <form className="max-w-sm md:max-w-xl mx-auto mt-5" onSubmit={formik.handleSubmit}>
        <h1 className='text-green-500 text-3xl font-semibold text-center mt-12'>Register Now</h1>
        {apiSuccess && <div className='bg-green-100 rounded-lg text-green-800 py-2 font-normal mt-3 px-3 text-center'>{apiSuccess}</div>}
        {apiError && <div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{apiError}</div>}
        <div className="mb-5 mt-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
          <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="EX: MO Salah"
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.name}</div>) : ""}
        </div>
        <div className="mb-5">
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
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
          <input type="tel" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="EX: 01270755944"
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.phone}</div>) : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.password}</div>) : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat Password:</label>
          <input type="password" id="rePassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Repeat Password"
            name='rePassword'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (<div className='bg-red-100 rounded-lg text-red-800 py-2 font-normal mt-3 px-3 text-center'>{formik.errors.rePassword}</div>) : ""}
        </div>

        <div className='w-full flex justify-end'>
          <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
        <div className='w-full flex justify-center mt-3 text-gray-500'>Already have an account? <Link className='ps-2 text-gray-700 font-bold' to="/login"> Login</Link>
        </div>
      </form>
    </>
  );
}
