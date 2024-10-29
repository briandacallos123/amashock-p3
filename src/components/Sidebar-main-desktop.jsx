import React from 'react'
// 
import { Link } from 'react-router-dom'

const SidebarMerchant = ({links}) => {
  return (
    <div className="sidebar pt-20 -z-10 w-[200px]  bg-[#131921]">
        <div className="">
            <ul className="links flex pl-7 flex-col space-y-7">
                {links?.map(({id, label, path})=>(
                    <Link key={id} className="text-white uppercase font-semibold hover:scale-110 transition-transform duration-300 ease-in-out" to={path} id={id}>{label}</Link>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SidebarMerchant