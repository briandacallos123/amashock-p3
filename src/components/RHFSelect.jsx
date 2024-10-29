import React from 'react'

const RHFSelect = ({name, option, label, ...rest}) => {
  return (
    <div className="space-y-3">
      <label htmlFor={name} className="block text-md font-medium  text-gray-400">
          {label}
          </label>
        <select name={name} {...rest}>
            {option?.map((item)=>(
                <option key={item?.id} value={item?.value}>{item?.label}</option>
            ))}
        </select>
    </div>
  )
}

export default RHFSelect