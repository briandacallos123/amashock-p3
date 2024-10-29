import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import RHFTextField from '../../components/RHFTextField'
import RHFCheckbox from '../../components/RHFCheckbox'

import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'


export const action = async({request}) => {
  try {
    const fData = await request.formData();
    const data = Object.fromEntries(fData);
    await customFetch.post('/auth/register', data);
    toast.success("Register successfully");

    return redirect('../login');
  } catch (error) {
    toast.error(error.response?.data?.msg);
    return error;
  }
}

const Register = () => {
  return (
    <div className="lg:min-w-[500px] mx-auto space-y-10 pt-10">
      <h1 className="text-2xl text-gray-400">Sign Up</h1>
    
      <div className="bg-white p-10">


        <Form method="post" className="space-y-5 mb-5">
          <RHFTextField label="First and Last Name" name="name" type="text" required placeholder="Search..." />
          <RHFTextField label="Email" name="email" type="email" required placeholder="your email..." />
          <RHFTextField label="Password" name="password" type="password" placeholder="**********" required />
          <RHFCheckbox label="register as merchant" name="isMerchant" value={1}/>
          <button className="bg-[#FFD814] w-full py-3 px-5 rounded-lg" type="submit">Continue</button>

        </Form>

        <div>
          <p>Already have an account? <Link to="../login" className="text-blue-700 hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register