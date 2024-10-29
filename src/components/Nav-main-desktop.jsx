import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import NavMainSearchForm from './Nav-main-search-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHomeContext } from '../layout/Homelayout';
import { useCartContext } from '../context/cartContext';

const NavMainDesktop = () => {
    const { user } = useHomeContext();
    const { pathname } = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { state, resetCart } = useCartContext();
    const navigate = useNavigate()



    const handleNavigate = () => {
        let url;
        if (user?.userRole === 'merchant') {
            url = '/merchant';
        }
        return url;
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleNavigateCart = () => {
        if (state?.totalItem !== 0) navigate('/product/checkout')
    }

 

    return (
        <div className="bg-[#131921] p-5 lg:px-10 ">
            <div className="content flex items-center text-white space-x-7">
                <Link to="/" className="nav-logo text-3xl font-bold">Amashock</Link>

                <div className="flex items-center space-x-1">
                    <Icon icon="carbon:location-filled" />
                    <p>Deliver to <span className="font-semibold">Philippines</span></p>
                </div>

                <div className="flex-1">
                    <NavMainSearchForm placeholder="Search..." />
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <p>Hello,</p>
                        {!user ? (
                            <div className="flex items-center space-x-2">
                                <Link to="../login">Sign in</Link>
                                <p>/</p>
                                <Link to="../register">Sign up</Link>
                            </div>
                        ) : (
                            <p className="capitalize">{user?.name}</p>
                        )}
                    </div>



                    {user && (
                        <div className="dropdown dropdown-end ">
                            <Icon
                                tabIndex={0}
                                role="button"
                                className="m-1"
                                icon="mdi:user"
                                fontSize={25}
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <ul className="dropdown-content  z-[1000] menu bg-base-100 rounded-box w-40 py-3 px-5 space-y-5 text-black">
                                    <li>
                                        <Link to={user?.userRole === 'merchant' ? '/merchant' : '/customer/profile'}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>

                            )}
                        </div>
                    )}
                </div>

                {user?.userRole !== 'merchant' && (
                    <div onClick={handleNavigateCart} className="flex items-center space-x-2 cursor-pointer relative">
                        <p  className="absolute -top-5 left-4  font-bold text-[#F3A847] ">
                            {state?.totalItem !== 0 && state?.totalItem}
                        </p>
                       
                        <Icon className="z-50" icon="mdi:cart" fontSize={22} />
                        <p className="font-bold">Cart</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavMainDesktop;
