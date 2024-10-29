import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { links_no_user } from '../utils/constants'
import { useHomeContext } from '../layout/Homelayout'

const SidebarMainMobile = ({ links, closeSidebar }) => {
    const {user} = useHomeContext();
  
    return (
        <div>
            <div className="absolute py-8 pl-8 space-y-20 left-0 bottom-0 top-0 w-[80%] bg-slate-900 z-50">
                <h1 className="text-xl font-semibold">Amashock</h1>

                <div className="links flex flex-col  space-y-7">
                    {!user ? links_no_user?.map(({ id, label, path }) => (
                        <Link onClick={closeSidebar} key={id} className="text-white uppercase font-semibold hover:scale-110 transition-transform duration-300 ease-in-out" to={path} id={id}>{label}</Link>
                    )):
                    links?.map(({ id, label, path }) => (
                        <Link onClick={closeSidebar} key={id} className="text-white uppercase font-semibold hover:scale-110 transition-transform duration-300 ease-in-out" to={path} id={id}>{label}</Link>
                    ))
                    }
                    
                </div>
            </div>
            <div className="absolute p-8 left-0 top-0 bottom-0 w-[100%] bg-slate-800  opacity-85 z-10 flex justify-end">
                <Icon onClick={closeSidebar} icon="emojione-monotone:cross-mark-button" fontSize={25} />
            </div>
        </div>
    )
}

export default SidebarMainMobile