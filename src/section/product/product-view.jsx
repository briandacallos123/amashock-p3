import React, { useCallback, useEffect, useState } from 'react'
import customFetch from '../../utils/axios';
import { useLoaderData } from 'react-router';
import ListItem from '../home/list-item';
import RHFTextField from '../../components/RHFTextField';
import { useCartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {

  try {
    const { data: product } = await customFetch.get(`/public/product/${params?.id}`);

    const { data: productList } = await customFetch.get('/public/product');

    return { product, productList };
  } catch (error) {
    console.log(error);
    return error
  }
}

const ProductView = () => {
  const data = useLoaderData();
  const { addToCart } = useCartContext();
  const [qty, handleQuantity] = useState(0)
  const { attachment, title, posttedBy, price, quantity, description, category, _id } = data?.product?.data;




  const handleAddCart = () => {
    if (!qty) {
      toast.error("Provide quantity first!")
      return;
    }
    addToCart({
      _id,
      title,
      quantity: Number(qty),
      price,
      total: Number(price * qty),
      description,
      attachment,
      sellerId: posttedBy
    })
    toast.success("Added to cart successfully.")
    handleQuantity(0)
  }



  return (
    <div className="lg:w-[1200px] p-7 mx-auto lg:mt-20 space-y-20">

      <div className="bg-base-100 lg:w-[800px] lg:mx-auto px-5 py-2  flex flex-col lg:flex-row space-y-3 sm:space-y-5 lg:justify-around overflow-hidden">
        <div className="cursor-pointer lg:flex-1">
        <img src={attachment} className="w-[300px] h-[300px] object-contain" alt={title} />
        </div>
        <div className='flex flex-col space-y-2 lg:space-y-5 lg:flex-1 lg:px-10 lg:py-5 '>
          <div className="cursor-pointer capitalize font-semibold text-2xl lg:text-lg truncate">
            {title}
          </div>
          <div className="rating rating-sm lg:rating-md">
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          </div>
          <p className="text-lg text-wrap max-w-[300px]">{description}</p>
          <div className="badge badge-outline p-2 mt-auto">₱ {price}</div>
        </div>
        <div className="space-y-3 lg:flex-1">
          <RHFTextField value={qty !== 0 && qty} onChange={(e) => handleQuantity(e.target.value)} name="quantity" placeholder="Quantity" type="number" />
          <button onClick={handleAddCart} className="btn-c bg-[#F3A847] text-white font-semibold rounded-lg w-full">Add to Cart</button>
          <button className="btn-c bg-orange-600 text-white font-semibold rounded-lg w-full">Buy</button>

        </div>
      </div>


      <div className="space-y-10">
        <h1 className="text-xl text-gray-400">Other products you may like</h1>
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {data?.productList?.data && data?.productList?.data?.map((item) => (
            <ListItem key={item?._id} row={item} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default ProductView