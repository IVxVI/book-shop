import { editProduct } from '@/utils/axiosApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Loader from './Loader';

export const EditProductForm = ({ product }: any) => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    imgUrl: '',
    _id: ''
  });

  const queryClient = useQueryClient()
  
  const { mutate, isLoading,  } = useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast.success('Product edited successfully!')
    }
  })
  
  if(isLoading) {
    return <Loader />
  }  
  
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    return setProductData(
      { ...product, [event.target.name]: event.target.value }
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
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of your product</label>
          <input defaultValue={product.title} name='title' onChange={handleChanges} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lord of the rings" />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input defaultValue={product.price} name='price' onChange={handleChanges} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$ 25.99" />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea rows={10} defaultValue={product.description} name='description' onChange={handleChanges} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Best book ever" />
        </div>
        <div>
          <label htmlFor="imgUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
          <input defaultValue={product.imgUrl} name='imgUrl' onChange={handleChanges} type="text" id="imgUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="src/ || https//..." />
        </div>
      </div>
    
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}
