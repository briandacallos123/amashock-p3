import React, { createContext, useContext } from 'react'
import NavMainDesktop from '../components/Nav-main-desktop'
import NavMobileMain from '../components/Nav-main-mobile'
import { Outlet, useLoaderData } from 'react-router'
import customFetch from '../utils/axios'
import SidebarMerchant from '../components/Sidebar-main-desktop'
import CartContext from '../context/cartContext'

export const loader = async () => {
    try {
        const { data } = await customFetch.get('/user/current-user');
        return data;
    } catch (error) {
        return error
    }
}

const HomeContext = createContext({});

export const useHomeContext = () => {
    return useContext(HomeContext)
}

const Homelayout = () => {
    const { data: user } = useLoaderData();

    return (

        <HomeContext.Provider value={{ user }}>
            <CartContext>
                <div className="h-400">
                    <div>
                        <div className="hidden lg:block">
                            <NavMainDesktop />
                        </div>  
                        <div className="lg:hidden">
                            <NavMobileMain />

                        </div>
                    </div>
                    <div className="flex h-auto">


                        <Outlet user={user} />

                    </div>
                </div>
            </CartContext>
        </HomeContext.Provider>


    )
}

export default Homelayout