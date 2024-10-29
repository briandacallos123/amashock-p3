import { Icon } from '@iconify/react'
import React from 'react'

const NavMainSearchForm = ({name,type, ...rest}) => {
    return (
        <div>
           
            <div className="relative mt-2 rounded-md shadow-sm">
                
                <input
                    id="price"
                    name={name}
                    type={type}
                    {...rest}
                    className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button className="bg-[#F3A847] h-full w-12 flex items-center justify-center rounded-md">
                        <Icon className="h-[60%] w-[60%]" icon="clarity:search-line"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavMainSearchForm