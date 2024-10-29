import React from 'react'
import customFetch from '../../utils/axios';
import { useLoaderData } from 'react-router';


export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/orders/${params?.id}`);

        return data?.data
    } catch (error) {
        console.log(error)
        return false;
    }
}

const ViewOrder = () => {
    const data = useLoaderData();
    console.log(data,'??')

    return (
        <div className="lg:w-[1200px] p-7 mx-auto lg:mt-20 space-y-20">
            <div className="bg-base-100 lg:w-[800px] lg:mx-auto px-5 py-4 h-auto flex flex-col lg:flex-row space-y-3 sm:space-y-5 lg:justify-around overflow-hidden">
                <div className="cursor-pointer h-52 sm:h-[60%]">
                    <img src={data?.attachment} className="w-full h-full object-contain" alt={data?.productDetails?.title} />
                </div>
                <div className='flex flex-col space-y-2 lg:space-y-5 lg:flex-1 lg:px-10 lg:py-5 '>
                    <div className="cursor-pointer capitalize font-semibold text-2xl lg:text-lg truncate">
                        {data?.productDetails?.title}
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
                    <p className="text-lg truncate">{data?.productDetails?.description}</p>
                    <div className="badge badge-outline p-2 mt-auto">₱ {data?.productDetails?.price}</div>
                </div>
                {/* <div className="space-y-3">
                    <RHFTextField value={qty !== 0 && qty} onChange={(e) => handleQuantity(e.target.value)} name="quantity" placeholder="Quantity" type="number" />
                    <button onClick={handleAddCart} className="btn-c bg-[#F3A847] text-white font-semibold rounded-lg w-full">Add to Cart</button>
                    <button className="btn-c bg-orange-600 text-white font-semibold rounded-lg w-full">Buy</button>

                </div> */}
            </div>
        </div>
    )
}

export default ViewOrder