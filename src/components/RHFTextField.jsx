import React from 'react'

const RHFTextField = ({name, label, type, ...rest}) => {
    return (
        <div>
        <label htmlFor="price" className="block text-md font-medium  text-gray-400">
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
         
          <input
            name={name}
            type={type}
            {...rest}
            className="block w-full rounded-md border-0 py-2 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
         
        </div>
      </div>
    )
}

export default RHFTextField