import React from 'react'
import customFetch from '../../utils/axios'
import { redirect } from 'react-router';
import { toast } from 'react-toastify';

export const loader = async() => {
    try {
       

        await customFetch.get('/auth/logout');
        toast.success("Logout Successfully")
        return redirect('/')
    } catch (error) {
        console.log(error);
        return error
    }
}

const Logout = () => {
  return (<></>)
}

export default Logout