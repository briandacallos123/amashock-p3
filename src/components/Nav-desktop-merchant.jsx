import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavMechantMain = () => {
    return (
        <div className="bg-[#131921] h-[70px] px-6 flex w-full">
            <div className="content w-full flex items-center text-white space-x-10 justify-between">
                <Link to="/" className="nav-logo text-3xl font-bold">Amashock</Link>

                <div className="flex items-center space-x-5">
                    <Icon fontSize={23} icon="iconamoon:notification-fill" />

                    <Icon fontSize  ={23} icon="clarity:administrator-solid" />
                </div>

            </div>
        </div>
    )
}

export default NavMechantMain