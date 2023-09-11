'use client'

import { Product } from '@/types/Product';
import { editProduct } from '@/utils/axiosApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
  product: Product;
}

export const EditProductForm: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    title: product ? product.title : '',
    price: product ? product.price : '',
    description: product ? product.description : '',
    imgUrl: product ? product.imgUrl : '',
    _id: product._id
  });
  
  const queryClient = useQueryClient()
  
  const { mutate, isLoading } = useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast.success('Product edited successfully!')
    }
  })
  
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    return setProductData(
      { ...productData, [event.target.name]: event.target.value }
    )
  }
    
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      await mutate(productData);
      await router.push('/dashboard')
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <input type="hidden" name="_id" value={productData._id} />
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of your product</label>
          <input defaultValue={productData.title} name='title' onChange={handleChanges} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lord of the rings" />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input defaultValue={productData.price} name='price' onChange={handleChanges} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$ 25.99" />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea rows={10} defaultValue={productData.description} name='description' onChange={handleChanges} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Best book ever" />
        </div>
        <div>
          <label htmlFor="imgUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
          <input defaultValue={productData.imgUrl} name='imgUrl' onChange={handleChanges} type="text" id="imgUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="src/ || https//..." />
        </div>
      </div>
    
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}
