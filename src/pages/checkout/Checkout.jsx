import React, { useCallback } from 'react'
import { useNavigate } from 'react-router';
import { useCartContext } from '../../context/cartContext'
import CheckOutItem from './list-item';
import { useHomeContext } from '../../layout/Homelayout';
import { formatMoney } from '../../utils/numberFormatter';

const Checkout = () => {
    const {state, addToCart, decrementItem, deleteItem} = useCartContext();
    const navigate = useNavigate();
    const {user} = useHomeContext()

    const onNavigate = () => {
        if(!user){
            navigate('/login')
        }else{
            navigate('/product/checkout/address')
        }
    }
    
    const onIncrement = useCallback((item)=>{
            console.log(item,'hehehehehehehe')
        addToCart({
            _id:item?._id,
            title:item?.title,
            quantity:Number(item?.quantity + 1),
            price:item?.price,
            attachment:item?.attachment,
            total:Number(item.price * item.quantity),
            description:item?.description,
            isCheckout:true,
            productId:item?._id
          })
    },[])

    const onDecrement = useCallback((item)=>{
        decrementItem({
            _id:item?._id,
            price:item?.price
        })
    },[])

    const handleDeleteItem = (item) => {
    
        deleteItem(item)
    }

  return (
    <div className="grid grid-cols-1 pb-16 w-full py-5 px-2 space-y-5 max-w-[800px] lg:mx-auto">
        <button onClick={onNavigate} className="btn-c h-14 text-lg text-white bg-[rgb(243,168,71)] rounded-2xl">Proceed to checkout ({state?.totalItem} item{state?.totalItem > 1 && "s"})</button>


        {state?.cart?.map((item)=>(
            <CheckOutItem onDeleteItem={()=>{
                handleDeleteItem(item)
            }} onDecrement={()=>{
                onDecrement(item)
            }} onIncrement={()=>onIncrement(item)} key={item?._id} row={item}/>
        ))}
        

        <div className="md:hidden fixed font-semibold bottom-0 w-full bg-[#131921] text-white left-0 right-0 py-5 px-5 flex items-center justify-between">
           <div className="flex items-center space-x-2 text-lg">
                <h2>Number of items: </h2>
                <p>{state?.totalItem}</p>
           </div>
           <div className="flex items-center space-x-2 text-lg">
             <h2>Total: </h2>
                <p>{formatMoney(state?.total)}</p>
           </div>
        </div>
    </div>
  )
}

export default Checkout