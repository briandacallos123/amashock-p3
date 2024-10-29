import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavMainSearchForm from './Nav-main-search-form'
import { useHomeContext } from '../layout/Homelayout'
import { useCartContext } from '../context/cartContext'
import SidebarMainMobile from './Sidebar-main-mobile'
import { customerLinks, sidebarLinks } from '../utils/constants'

const NavMobileMain = () => {
    const { user } = useHomeContext();
    const { state, resetCart } = useCartContext();
    const navigate = useNavigate()
    const [openSide, setOpenSide] = useState(false);

    const handleNavigate = () => {
        if (state?.totalItem !== 0) navigate('/product/checkout')
    }

    const handleLogout = () => {
        
        navigate('/logout')
        let hasCart = JSON.parse(localStorage?.getItem('cart'));
        if(hasCart){
            localStorage.removeItem('cart')
        }
        resetCart();
    }

    const isMerchant = user?.userRole === 'merchant'

    const openSidebar = () => {
        setOpenSide(!openSide)
    }

    const closeSidebar = () => {
        setOpenSide(false)

    }

    

    return (
        <div className={`bg-[#131921] text-white px-3 ${isMerchant ? "h-16":"h-32"} flex flex-col justify-center space-y-2`}>
            {openSide && <SidebarMainMobile closeSidebar={closeSidebar} links={isMerchant ? sidebarLinks : customerLinks}/>}
            <div className="flex items-center justify-between">

                <div className="flex items-center space-x-3 ">
                    <Icon onClick={openSidebar} icon="iconamoon:menu-burger-horizontal" fontSize={22} />
                    <Link to="/" className="text-xl">Amashock</Link>
                </div>

                <div className='space-x-5 flex items-center'>
                    {!user ? <div className="flex items-center space-x-2">
                        <Link to="../login">Sign in</Link>
                        <p>/</p>
                        <Link to="../register">Sign up</Link>

                        </div> :
                        <div className="flex items-center space-x-2">
                            <h1 className="capitalize">{user?.name}</h1>
                            <div className="dropdown dropdown-end">
                                <Icon tabIndex={0} role="button" icon="teenyicons:down-solid" fontSize={17} />

                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow text-black">
                                    {/* <li><a>Profile</a></li> */}
                                    <li><Link to="../customer/profile">Profile</Link></li>

                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>}
                   {!isMerchant &&  <div onClick={handleNavigate} className="relative">
                        <Icon fontSize={20} icon="mdi:cart" />
                        <p className="absolute -top-5 left-1 font-bold text-[#F3A847]">
                            {state?.totalItem !== 0 && state?.totalItem}
                        </p>
                    </div>}
                </div>
            </div>
            {!isMerchant && <div>
                <NavMainSearchForm placeholder="Search" />
            </div>}

        </div>
    )
}

export default NavMobileMain