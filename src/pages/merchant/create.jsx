import React from 'react'
import RHFTextField from '../../components/RHFTextField'
import RHFTextArea from '../../components/RHFTextArea'
import { Form, redirect } from 'react-router-dom'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import RHFSelect from '../../components/RHFSelect'

export const action = async ({ request }) => {
  // const fData = await customFetch.post('/')
  const fData = await request.formData();

  const sFile = fData.get('attachment');
  if (sFile && sFile.size > 500000) {
    toast.error("too large file");
    return;
  }

  try {
    await customFetch.post('/product', fData);
    toast.success("Created product successfully!");
    return redirect('../')
  } catch (error) {
    console.log(error);
    return error;
  }

}

const categoryOption = [
  {
    id:1,
    label:"Gadgets",
    value:"gadgets"
  },
  {
    id:2,
    label:"Garments",
    value:"garments"
  },
  {
    id:3,
    label:"Shoes",
    value:"shoes"
  },
  {
    id:4,
    label:"Equipment",
    value:"equipment"
  },
]

const Create = () => {
  return (
    <div className="py-14 px-14 space-y-10">
      <h1 className="text-2xl">Create Product</h1>
      <div>
        <Form method="post" encType='multipart/form-data' className="gap-3 grid  grid-cols-2">
            <RHFTextField name="title" label="Product Name" type="text" />
            <RHFTextField name="quantity" label="Quantity" type="number" />
            <RHFTextField name="price" label="Price" type="number" />
            <RHFSelect label="Category" name="category" option={categoryOption}/>
           
            <input type="file" name="attachment" accept='*/images' />
            <div className="col-span-2">
             <RHFTextArea name="description" label="Description" />
            </div>

            <button className="btn bg-[#131921] text-white w-full">Create</button>
        </Form>
      </div>
    </div>
  )
}

export default Create