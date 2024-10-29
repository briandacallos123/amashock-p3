import React from 'react'

const RHFCheckbox = ({name,label,...rest}) => {
  return (
   <div className="flex items-center space-x-2">
     <input type="checkbox" name={name} {...rest}/>
     <span className="capitalize">{label}</span>
   </div>
  )
}

export default RHFCheckbox