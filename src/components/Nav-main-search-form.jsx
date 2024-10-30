import { Icon } from '@iconify/react'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import customFetch from '../utils/axios'
import { useDataContext } from '../context/data'


const NavMainSearchForm = ({ name, type, ...rest }) => {
    const { fillData, data } = useDataContext();
    const [toSearch, setToSearch] = useState(null);
    const currentPath = window.location.pathname;


    const handleChange = async (e) => {
        setToSearch(e)
    }

    const handleSearch = useCallback(async () => {
        try {
           if(currentPath !== '/'){
            window.location = '/';
           }
            const result = await customFetch.post('/public/product/search', {
                boss: toSearch
            });
            const { data } = result?.data;

            fillData(data)
        } catch (error) {
            console.log(error)
        }
    }, [toSearch])

    return (
        <div>

            <div className="relative mt-2 rounded-md shadow-sm">

                <input
                    id="price"
                    name={name}
                    onChange={(e) => handleChange(e.target.value)}
                    type={type}
                    {...rest}
                    className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button onClick={handleSearch} className="bg-[#F3A847] h-full w-12 flex items-center justify-center rounded-md">
                        <Icon className="h-[60%] w-[60%]" icon="clarity:search-line" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavMainSearchForm