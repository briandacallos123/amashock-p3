import React, { useCallback, useEffect, useState } from 'react'
import customFetch from '../../utils/axios';
import { useLoaderData } from 'react-router';
import { Icon } from '@iconify/react';
import Stats from '../../components/Stats';
import StatsMoney from '../../components/StatsMoney';
import { formatMoney } from '../../utils/numberFormatter';
import { Link } from 'react-router-dom';


export const loader = async () => {
  // try {
  //   const { data } = await customFetch.get('/orders/customer');
  //   return data?.data;
  // } catch (error) {
  //   console.log(error);
  //   return error
  // }
  return null
}

const Orders = () => {
  const [tableData, setTableData] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  const [filtering, setFiltering] = useState({
    take: 5,
    skip: 0
  })
  const [currentIdex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await customFetch.post('/orders/customer', {
        skip: currentIdex * 5,
        take: filtering?.take
      });


      const { data: fData, totalRecords, totalExpenses } = data?.data
      return { fData, totalRecords, totalExpenses}

    } catch (error) {
      console.log(error);
      return error
    }
  }

  useEffect(() => {
    fetchData().then((res) => {
      setTableData(res?.fData);
      setTotalRecords(res?.totalRecords)
      setTotalExpenses(res?.totalExpenses?.totalAmount || 0)

    })
  }, [filtering.take, filtering.skip, currentIdex])

  const handleNext = useCallback(() => {
 
    setFiltering((prev) => {
      return {
        ...prev,
        skip: prev?.skip + 5
      }
    })
  }, [])

  const handlePrev = useCallback(() => {
    if (filtering?.skip !== 0) {
      setFiltering((prev) => {
        return {
          ...prev,
          skip: prev?.skip - 5
        }
      })
    }
  }, [filtering.skip])


  const RenderMobile = () => {
    return (
      <div className="overflow-y-auto w-full mr-10 h-auto pb-7 ">
        <table className="table table-zebra  min-h-[200px] ">
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Name</th>
              <th>Total</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody >

            {tableData?.map((item) => (
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
                <td>

                  <div className="dropdown dropdown-end">
                    <Icon tabIndex={0} role="button" icon="fa6-solid:ellipsis-vertical" fontSize={20} />

                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                      <li><Link to={`/customer/view/${item?._id}`} className="text-green-600">
                        <Icon icon="mdi:eye" fontSize={20} />
                        View</Link></li>

                    </ul>
                  </div>

                </td>
              </tr>
            ))}



          </tbody>
        </table>
     
        <div className="join w-full items-center justify-center  pt-10  bottom-10">
        {[...Array(Math.ceil(totalRecords / 5))]?.map((item, index) => (
              <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={index + 1}
                onClick={()=>setCurrentIndex(index)}
                defaultChecked={index == currentIdex}/>

            ))}
        
        
        </div>
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

            {tableData?.map((item) => (
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
                      <li><Link to={`/customer/view/${item?._id}`} className="text-green-600">
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
                onClick={()=>setCurrentIndex(index)}
                defaultChecked={index == currentIdex}/>
            ))}
        
        </div>
       
      </div>
    )
  }


  return (
    <div className="pt-9 px-7 w-full">
      <div className="space-y-5  ">
        <h1 className="text-2xl text-gray-500">Orders</h1>


 
          <div className="grid grid-cols-2  lg:grid-cols-4">
            <div>
              <Stats title="Total Orders" value={totalRecords} description="Total number of Orders"/>
            </div>
            <div>
              <StatsMoney title="Total Expenses" value={totalExpenses ? formatMoney(totalExpenses) : 0} description="Total number of Expenses"/>
            </div>
          </div>
      

        <div className="lg:hidden w-full">
          {tableData?.length !== 0 ? <RenderMobile /> : <h1 className="text-3xl text-gray-400">No Orders!</h1>}

        </div>
        <div className="hidden lg:block">
          {tableData?.length !== 0 ? <RenderDesktop /> : <h1 className="text-3xl text-gray-400">No Orders!</h1>}
        </div>
      </div>
    </div>
  )
}

export default Orders