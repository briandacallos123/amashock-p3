import React, { useEffect } from 'react'
import customFetch from '../utils/axios'
import { useLoaderData } from 'react-router';
import ListItem from '../section/home/list-item';
import { useDataContext } from '../context/data';

export const loader = async() => {
    try {
        const {data} = await customFetch.get('/public/product');
        return data?.data;
    } catch (error) {
        console.log(error);
        return error
    }
}

const HomePage = () => {
    const dataRes = useLoaderData()

    const {fillData, data} = useDataContext();

    useEffect(()=>{
        fillData(dataRes)
    },[])

  return (
    <div className="w-[1400px] mx-auto py-10 px-5">
        
        {/* category */}
        <div className="grid grid-cols-2  lg:grid-cols-5 gap-2 lg:gap-5">
            {data?.length !== 0 && data?.length && data?.map((item)=>(
                <ListItem row={item}/>
            ))}
        
          
        </div>
    </div>
  )
}

export default HomePage