import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useHomeContext } from './Homelayout'
import SidebarMerchant from '../components/Sidebar-main-desktop'
import NavMechantMain from '../components/Nav-desktop-merchant'
import { sidebarLinks } from '../utils/constants'

const DashboardLayout = () => {
    const { user } = useHomeContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user?.userRole !== 'merchant'){
            navigate('/')
        }
    },[user])
    return (
        <div className='w-full background-white '>
            <div>
                {/* <NavMechantMain /> */}
            </div>
            <div className='flex'>
                {user?.userRole === 'merchant' && <div>
                    <div className="hidden lg:block">
                        <SidebarMerchant links={sidebarLinks}/>
                    </div>
                    <div></div>
                </div>}
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout