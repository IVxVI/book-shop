import { editProduct } from '@/utils/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react'
import { Product } from '@/types/Product';
import AdminForm from './AdminForm';

type Props ={
  product: Product,
}

export const EditProductForm: FC<Props> = ({ product }) => {
  const initialValues = product;

  const dataInputs = [
    {inDataId: 'title', lInnerText: 'Title', inType: 'text', inAutoComplete: 'product-name' },
    {inDataId: 'price', lInnerText: 'Price', inType: 'number', inAutoComplete: 'product-price' },
    {inDataId: 'description', lInnerText: 'Description', inType: 'text', inAutoComplete: 'product-description' },
    {inDataId: 'imgUrl', lInnerText: 'Image Url', inType: 'text', inAutoComplete: 'product-imgUrl' },
    {inDataId: 'author', lInnerText: 'Author', inType: 'text', inAutoComplete: 'product-author' },
    {inDataId: 'pagesQty', lInnerText: 'PagesQty', inType: 'number', inAutoComplete: 'product-pagesQty' },
    {inDataId: 'language', lInnerText: 'Language', inType: 'text', inAutoComplete: 'product-language' },
  ]

  const queryClient = useQueryClient()
  
  const { mutate, status } = useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  return (
    <AdminForm 
      initialValues={initialValues}
      dataInputs={dataInputs}
      mutate={mutate}
      status={status}
    />
  )


}
