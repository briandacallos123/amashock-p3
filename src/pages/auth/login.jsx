import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import RHFTextField from '../../components/RHFTextField'
import customFetch from '../../utils/axios'
import {toast} from 'react-toastify'
import { useCartContext } from '../../context/cartContext'

export const action = async({request}) => {
  try {
    const fData = await request.formData();
    const datas = Object.fromEntries(fData);
    let hasCart = Number(datas?.cart);

    delete datas.cart
    const {data} = await customFetch.post('/auth/login', datas);
 
    toast.success("Login sucessfully");
    
    if(data?.user?.userRole === 'merchant'){
      return redirect('/merchant')
    }else if(hasCart){
      return redirect("/product/checkout/address")
    }
    else{
      return redirect('/')
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const {state} = useCartContext();
  return (
    <div className="lg:min-w-[500px] mx-auto space-y-10 pt-10">
      <h1 className="text-2xl text-gray-400">Sign In</h1>
      <div className="bg-white p-10">


        <Form method="post" className="space-y-5 mb-5">
        
          <RHFTextField label="Email" name="email" type="email" required placeholder="your email..." />
          <RHFTextField placeholder="**********"  label="Password" name="password" type="password" required />
          <input className="hidden" name="cart" value={state?.totalItem}/>
          
          <button className="bg-[#FFD814] w-full py-3 px-5 rounded-lg" type="submit">Continue</button>

        </Form>

        <div>
          <p>Don't have an account? <Link to="../register" className="text-blue-700 hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login