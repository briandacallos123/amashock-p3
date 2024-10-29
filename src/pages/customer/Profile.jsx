import React, { useState } from 'react'
import { useLoaderData } from 'react-router';
import customFetch from '../../utils/axios';
import { Form } from 'react-router-dom';
import RHFTextField from '../../components/RHFTextField';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

export const loader = async () => {
    try {
        const { data } = await customFetch.get('/user/current-user');
        return data?.data
    } catch (error) {
        return error
    }
}

export const action = async ({request}) => {
    try {
        const fData = await request.formData();
        const data = Object.fromEntries(fData);

        if(data?.password !== data?.rePassword){
            toast.error("Re-password doesn't match the password!");
            return false;
        }
        await customFetch.post('/user/update-account',data);
        toast.success("Updated Successfully")
        return null
    } catch (error) {
        return error
    }
}

const Profile = () => {
    const data = useLoaderData()
    const [isEdit, setEdit] = useState(false)

    const handleEdit = () => setEdit(!isEdit)

    return (
        <div className="pt-9 px-7 w-full">
            <div className="w-full p-5 space-y-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-gray-500">Profile</h1>
                    <Icon onClick={handleEdit} className="text-green-700" icon="mdi:pencil" fontSize={22} />
                </div>
                <Form method="post" className="w-full space-y-5 p-2">
                    <RHFTextField label="Name" defaultValue={data?.name} name="name" />
                    <RHFTextField label="Email" defaultValue={data?.email} name="email" />
                    {isEdit && (
                        <div className="space-y-5">
                            <RHFTextField type="password" label="Password" name="password" />
                            <RHFTextField type="password" label="Re-Password" name="rePassword" />
                            <button className="bg-[#FFD814] w-full py-3 px-5 rounded-lg" type="submit">Update</button>

                        </div>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default Profile