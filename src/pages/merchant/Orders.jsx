import React, { useState } from 'react'
import { useLoaderData } from 'react-router';
import customFetch from '../../utils/axios';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


export const loader = async () => {
    try {
        const { data } = await customFetch.get('/orders/merchant');
        return data?.data
    } catch (error) {
        return error
    }
}

const MerchantOrders = () => {
    const data = useLoaderData()
    const [tableData, setTableData] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const RenderMobile = () => {
        return (
            <div className="overflow-auto w-full mr-10 h-auto bg-slate-100 pb-7">
                <table className="table table-zebra  min-h-[200px] ">
                    <thead>
                        <tr>
                            {/* <th></th> */}
                            <th>Name</th>
                            <th>Total</th>
                            {/* <th>Qty</th> */}
                            {/* 
                  <th>Total</th> */}
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data?.map((item) => (
                            <tr key={item?._id} className="z-50">
                                <td>
                                    <div className=" flex items-center space-x-2 ">
                                        <div className="w-10  ">
                                            <img src={item?.attachment} className='rounded-full w-full h-full object-contain' />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="capitalize font-bold">{item?.productName}</p>
                                            <p>{item?.quantity} x {item?.price}</p>

                                        </div>
                                    </div>
                                </td>

                                <td>{item?.value}</td>
                                <td align="center">

                                    <div className="dropdown dropdown-end">
                                        <Icon tabIndex={0} role="button" icon="fa6-solid:ellipsis-vertical" fontSize={20} />

                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                            <li><a className="text-green-600">
                                                <Icon icon="mdi:eye" fontSize={20} />
                                                View</a></li>

                                        </ul>
                                    </div>

                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>
        )
    }

    const RenderDesktop = () => {
        return (
            <div className="overflow-auto mr-10 h-auto pb-7 ">
                <table className="table table-zebra  min-h-[200px] ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >

                        {data?.map((item) => (
                            <tr key={item?._id} className="z-50">
                                <td>
                                    <div className=" flex items-center space-x-2 ">
                                        <div className="w-10  ">
                                            <img src={item?.attachment} className='rounded-full w-full h-full object-contain' />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="capitalize font-bold">{item?.productName}</p>
                                            <p>{item?.quantity} x {item?.price}</p>

                                        </div>
                                    </div>
                                </td>

                                <td>{item?.value}</td>
                                <td >

                                    <div className="dropdown dropdown-end">
                                        <Icon tabIndex={0} role="button" icon="fa6-solid:ellipsis-vertical" fontSize={20} />

                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                            <li><Link to={`/merchant/view/${item?._id}`} className="text-green-600">
                                                <Icon icon="mdi:eye" fontSize={20} />
                                                View</Link></li>

                                        </ul>
                                    </div>

                                </td>
                            </tr>
                        ))}



                    </tbody>

                </table>
                <div className=" overflow-hidden w-[300] absolute right-52 bottom-32 ml-auto">

                    {[...Array(Math.ceil(totalRecords / 5))]?.map((item, index) => (
                        <input
                            className="join-item btn btn-square"
                            type="radio"
                            name="options"
                            aria-label={index + 1}
                            onClick={() => setCurrentIndex(index)}
                            defaultChecked={index == currentIdex} />
                    ))}

                </div>

            </div>
        )
    }


    return (
        <div className="pt-9 px-7 w-full">
            <div className="space-y-5  ">
                <h1 className="text-2xl text-gray-500">Orders</h1>
                <div className="lg:hidden w-full">
                    {data?.length !== 0 ? <RenderMobile /> : <h1 className="text-3xl text-black">No Orders!</h1>}
                </div>

                <div className="hidden lg:block">
                    {data?.length !== 0 ? <RenderDesktop /> : <h1 className="text-3xl text-gray-400">No Orders!</h1>}
                </div>
            </div>
        </div>
    )
}

export default MerchantOrders