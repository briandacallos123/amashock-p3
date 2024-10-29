import React from 'react'
import RHFTextField from '../../components/RHFTextField'
import { Link, useLoaderData } from 'react-router-dom'
import customFetch from '../../utils/axios'
import ListItem from '../../section/merchant/dashboard/list-item'

export const loader = async() => {
  try {
    const {data} = await customFetch.get('/product/merchant');
    return data?.data
  } catch (error) {
    return error
  }
}

const Dashboard = () => {
  const data = useLoaderData()

  return (
    <div className="pt-9 lg:pt-20 px-10 w-full space-y-20">
      <div className="header flex flex-col lg:flex-row space-y-5 lg:items-center lg:justify-between">
        <h1 className="text-2xl">Dashboard</h1>
        
        <div className="flex items-center justify-between space-x-7">
          <RHFTextField name="search" type="text" placeholder="Search..."/>
          <Link to="../merchant/create-product" className="bg-[#131921] btn text-white py-2 px-5 lg:px-10">Create</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 ">
        
        {data?.map((item)=>(
          <ListItem row={item}/>
        ))}
      
        
      </div>
    </div>
  )
}

export default Dashboard