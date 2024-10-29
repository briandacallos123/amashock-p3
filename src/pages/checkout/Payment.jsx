import React, { useCallback, useEffect } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCartContext } from '../../context/cartContext';
import customFetch from '../../utils/axios';




const Payment = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();
  const { resetCart, state } = useCartContext();


  const onCreateOrder = useCallback(async (data, actions) => {




    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 100,
            currency_code: 'PHP'
          },
        },
      ],
    });
  }, [])


  const onApproveOrder = async (data, actions) => {
    toast.success("Placed order successfully!")
    localStorage.removeItem('cart');
    resetCart()

    const { brgy, city, number, street } = JSON.parse(localStorage.getItem('address'));

    let address = `${street} ${number} ${brgy}, ${city}`;

    const payload = state?.cart?.map((item) => {
      console.log(item,'itemmmmmmmmmmmmm')
      return {
        productName: item?.title,
        productId:item?._id,
        price: item?.price,
        quantity: item?.quantity,
        value: item?.total,
        deliveryAddress: address,
        attachment: item?.attachment,
        sellerId: item?.sellerId

      }
    })



    await customFetch.post('/orders', payload)
    navigate('/');


    return actions.order.capture().then((details) => {
      if (loadingButtonRef.current) {
        setValue('payment', 'paypal');
        setValue('refNumber', details?.id)
      }
    });

  }

  

  return (
    <div className="py-10 px-5 space-y-10 w-full  overflow-hidden lg:max-w-[600px] lg:mx-auto lg:pt-16">
      <h1 className="text-xl text-gray-400">Payment</h1>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <Icon icon="gridicons:notice" fontSize={22} className="text-blue-600" />
          <span>Use this sample paypal account for payment:</span>
        </div>
        <div className="space-y-2">
          <p>Email: sb-qrmm4331847159@personal.example.com</p>
          <p>Password: hhFr+ML3</p>
        </div>

      </div>
      {/* <button onClick={go} className="py-2 px-5">Go</button> */}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApproveOrder(data, actions)}
      />
    </div>

  )
}

export default Payment