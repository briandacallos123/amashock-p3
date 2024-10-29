import React, {createContext, useContext, useEffect, useReducer} from 'react'

const CartContextProvider = createContext({});

export const useCartContext = () => useContext(CartContextProvider);

const initialState = {
    cart:[],
    total:0,
    totalItem:0,
    address:{
        street:"",
        houseNumber:"",
        brgy:"",
        city:""
    }
}

const reducer = (state, action) => {
    switch(action.type){
        case "FILL":
            const {cart, total, totalItem} = action.payload;
            return {
                cart,
                total,
                totalItem
            }
        case "ADD":
            const {_id, price, quantity} = action.payload;
            let isExists = state.cart.findIndex((item)=>item?._id ===_id);
            let newState = [];
            let newTotal = state.total;
            let totalItems = state.totalItem;

            if(isExists !== -1){
                isExists = 2
            }
            

            if(isExists === -1){
                newState = [...state.cart, {...action.payload, productId:_id}]
                newTotal += (Number(price) * Number(quantity))
                totalItems += 1;
            }else{
                let isCheckout = action?.payload?.isCheckout
                newState = state?.cart?.map((item)=>{
                    if(item?._id === _id){
                        return {
                            ...item,
                            quantity:Number(isCheckout ? item?.quantity + 1 : item?.quantity + quantity),
                            total:Number(isCheckout ? item?.price * 1 : item?.price * quantity)
                            // total:Number(item?.price * 1)
                        }
                    }else{
                        return item
                    }
                })
                newTotal += Number(isCheckout ? price * 1: price * quantity);
                
            }

            return{
                ...state,
                cart:newState,
                total:newTotal,
                totalItem:totalItems
            }
        case "DECREMENT":
            const {_id:decId, price:price1} = action.payload;
            let itemTarget = state?.cart?.find((item)=>item?._id === decId);
          
            let newCart;
            let newTotal1 = state.total;
            let totalItems1 = state.totalItem;

            if(itemTarget?.quantity > 1){
                newCart = state?.cart?.map((item)=>{
                    if(item?._id === decId){
                        return {
                            ...item,
                            quantity: item?.quantity - 1
                        }
                    }else{
                        return item
                    }
                })
                newTotal1 -= Number(price1 * 1)
            }else{
                newCart = state?.cart?.filter((item)=>item?._id !== decId)
                newTotal1 = Number(newTotal1 - price1)
                totalItems1 -= 1;
            }

            return {
                ...state,
                cart:newCart,
                total:newTotal1,
                totalItem:totalItems1
            }
        case "ADD_ADDRESS":
            return {
                ...state,
                address:{
                    ...action.payload
                }
            }
        case "DELETE_ITEM":
            const newCart2 = state?.cart?.filter((item)=>item?._id !== action?.payload?._id);
            let totalItems2 = state.totalItem;
          
           
            return {
                state:newCart2,
                totalItem:totalItems2-1
            }
        case "RESET_STATE":{
            return {
                cart:[],
                total:0,
                totalItem:0,
                address:{
                    street:"",
                    houseNumber:"",
                    brgy:"",
                    city:""
                }
            }
        }
    }
}

const CartContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
        // if(state?.totalItem){
        // }
        localStorage.setItem('cart', JSON.stringify(state))

    },[state])

    useEffect(()=>{
        const localVal = JSON.parse(localStorage.getItem('cart'));
        if(localVal){
            dispatch({
                type:"FILL",
                payload:localVal
            })
        }
    },[])

    const addToCart = (val) => {
        dispatch({
            type:"ADD",
            payload:val
        })
    }

    const deleteItem = (val) => {
        dispatch({
            type:"DELETE_ITEM",
            payload:val
        })
    }

    const resetCart = () => {
        dispatch({
            type:"RESET_STATE",
        })
    }

    const decrementItem = (val) => {
        dispatch({
            type:"DECREMENT",
            payload:val
        })
    }

  return (
    <CartContextProvider.Provider value={{ deleteItem, state,decrementItem, addToCart, resetCart}}>
        {children}
    </CartContextProvider.Provider>
  )
}

export default CartContext