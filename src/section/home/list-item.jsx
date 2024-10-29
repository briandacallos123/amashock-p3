import React from 'react'
import { Link } from 'react-router-dom';
import { useHomeContext } from '../../layout/Homelayout';

const ListItem = ({ row }) => {
    const { attachment, category, price, title, description, _id } = row;
    const {user} = useHomeContext();

    const isCustomer = user?.userRole === 'customer' || !user;

    return (
        <div className="bg-base-100 px-5 py-4 h-auto flex flex-col space-y-3 sm:space-y-5 overflow-hidden">
            <Link to={isCustomer &&`/product/view/${_id}`} className="cursor-pointer h-40 sm:h-[60%]">
                <img src={attachment} className="w-full h-full object-contain" alt={title} />
            </Link>
            <div className='flex flex-col space-y-1 lg:space-y-2'>
                <Link to={isCustomer &&`/product/view/${_id}`} className="cursor-pointer capitalize font-semibold text-lg truncate">
                    {title}
                </Link>
                <div className="rating rating-xs">
                    {Array.from({ length: 5 }, (_, index) => (
                        <input
                            key={index}
                            type="radio"
                            name={`rating-${_id}`}
                            className="mask mask-star-2 bg-orange-400"
                        />
                    ))}
                </div>
                <p className="text-sm truncate">{description}</p>
                <div className="badge badge-outline p-2 mt-auto">₱ {price}</div>
            </div>
        </div>
    )
}

export default ListItem;
