import { editProduct } from '@/utils/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react'
import toast from 'react-hot-toast';
import { Product } from '@/types/Product';
import AdminForm from './AdminForm';

type Props ={
  product: Product,
}

export const EditProductForm: FC<Props> = ({ product }) => {
  const initialValues = product;

  const dataInputs = [
    {value: initialValues.title, inDataId: 'title', lInnerText: 'Title', inType: 'text', inAutoComplete: 'product-name' },
    {value: initialValues.price, inDataId: 'price', lInnerText: 'Price', inType: 'number', inAutoComplete: 'product-price' },
    {value: initialValues.description, inDataId: 'description', lInnerText: 'Description', inType: 'text', inAutoComplete: 'product-description' },
    {value: initialValues.imgUrl, inDataId: 'imgUrl', lInnerText: 'Image Url', inType: 'text', inAutoComplete: 'product-imgUrl' },
    {value: initialValues.author, inDataId: 'author', lInnerText: 'Author', inType: 'text', inAutoComplete: 'product-author' },
    {value: initialValues.pagesQty, inDataId: 'pagesQty', lInnerText: 'PagesQty', inType: 'number', inAutoComplete: 'product-pagesQty' },
    {value: initialValues.language, inDataId: 'language', lInnerText: 'Language', inType: 'text', inAutoComplete: 'product-language' },
  ]

  const queryClient = useQueryClient()
  
  const { mutate, isLoading } = useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast.success('Product edited successfully!')
    },
  })

  return (
    <AdminForm 
      initialValues={initialValues}
      dataInputs={dataInputs}
      mutate={mutate}
      isLoading={isLoading}
    />
  )


}
