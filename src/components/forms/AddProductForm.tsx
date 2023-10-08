'use client'

import { addProduct } from '@/utils/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import AdminForm from './AdminForm';

export default function AddProductForm() {
  const initialValues = {
    title: '',
    price: '',
    description: '',
    imgUrl: '',
    author: '',
    pagesQty: '',
    language: '',
    category: 'books-comics',
    _id: ''
  };

  const dataInputs = [
    {inDataId: 'title', lInnerText: 'Title', inType: 'text', inAutoComplete: 'product-name' },
    {inDataId: 'price', lInnerText: 'Price', inType: 'number', inAutoComplete: 'product-price' },
    {inDataId: 'description', lInnerText: 'Description', inType: 'text', inAutoComplete: 'product-description' },
    {inDataId: 'imgUrl', lInnerText: 'Image Url', inType: 'text', inAutoComplete: 'product-imgUrl' },
    {inDataId: 'author', lInnerText: 'Author', inType: 'text', inAutoComplete: 'product-author' },
    {inDataId: 'pagesQty', lInnerText: 'PagesQty', inType: 'text', inAutoComplete: 'product-pagesQty' },
    {inDataId: 'language', lInnerText: 'Language', inType: 'text', inAutoComplete: 'product-language' },
  ]

  const queryClient = useQueryClient()

  const { mutate, status } = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    }
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
