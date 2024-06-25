import React from 'react'
 import amazonPay from "../../assets/images/amazon-pay.png"
 import paypal from "../../assets/images/paypal.png"
import masterCard from "../../assets/images/mastercard.webp"
import appStore from "../../assets/images/get-apple-store.png"
 import googlePlay from "../../assets/images/get-google-play.png"
import logo from '../../assets/images/logo.svg'
export default function Footer() {
  return (
    <>
      <footer className='bg-gray-100 '>
        <div className="container mx-auto px-1 py-4">
          <img src={logo} width={120} alt="fresh cart logo " />
          <div className="my-6 px-2">
            <h2 className='text-3xl font-medium'>Get the FreshCard App</h2>
            <p className='my-3'>We will send ou a link, open it on your phone to download the app</p>
            <div className="flex gap-4">
              <input type="text" className="form-control flex-grow" placeholder='Email ...' />
              <button className='btn'>Share App Link</button>
            </div>
          </div>
          <div className='lg:flex items-center justify-between my-3 py-6 px-2 border-y border-gray-300'>
            <div className='flex gap-6 items-center mb-2 lg:mb-0'>
              <span className='text-lg'>Payment Partners</span>
              <div className='flex gap-2 items-center'>

                 <img src={masterCard} className='w-14' alt="" />
                <img src={paypal} className='w-14' alt="" />
                <img src={amazonPay} className='w-14' alt="" />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>Get it on</span>
              <div className='flex gap-2 items-center h-10 overflow-hidden'>
               <img src={googlePlay} className='w-24 ' alt="" />
                <img src={appStore} className='w-24' alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
