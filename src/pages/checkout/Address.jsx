import React from 'react'
import RHFTextField from '../../components/RHFTextField'
import { Form, redirect } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';


export const action = async({request}) =>{
  const fData = await request.formData();
  const data = Object.fromEntries(fData);
  localStorage.setItem('address',JSON.stringify(data));
  return redirect('/product/checkout/payment')
}
const Address = () => { 

  return (
    <div className="py-10 px-5 space-y-10 w-full lg:max-w-[600px] lg:mx-auto ">
        <h1 className="text-xl text-gray-400">Delivery Address</h1>
        <Form method="post" className="w-full space-y-5 h-auto ">
          <RHFTextField required  name="street" label="Street Name"/>
          <RHFTextField required  name="number" label="House Number"/>
          <RHFTextField required  name="brgy" label="Barangay"/>
          <RHFTextField required  name="city" label="City"/>
          <button type="submit" className="btn-c  w-full rounded-lg bg-[#F3A847] text-white font-semibold">Continue</button>
        </Form>
    </div>
  )
}

export default Address