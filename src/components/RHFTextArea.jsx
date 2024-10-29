import React from 'react'

const RHFTextArea = ({name, label, ...rest}) => {
  return (
    <div className="space-y-3">
          <label htmlFor={name} className="block text-md font-medium  text-gray-400">
          {label}
          </label>
        <textarea {...rest} name={name} cols="40" rows="10"></textarea>
    </div>
  )
}

export default RHFTextArea