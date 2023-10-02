'use client'

import { addProduct } from '@/utils/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'react-hot-toast';
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
    {value: initialValues.title, inDataId: 'title', lInnerText: 'Title', inType: 'text', inAutoComplete: 'product-name' },
    {value: initialValues.price, inDataId: 'price', lInnerText: 'Price', inType: 'number', inAutoComplete: 'product-price' },
    {value: initialValues.description, inDataId: 'description', lInnerText: 'Description', inType: 'text', inAutoComplete: 'product-description' },
    {value: initialValues.imgUrl, inDataId: 'imgUrl', lInnerText: 'Image Url', inType: 'text', inAutoComplete: 'product-imgUrl' },
    {value: initialValues.author, inDataId: 'author', lInnerText: 'Author', inType: 'text', inAutoComplete: 'product-author' },
    {value: initialValues.pagesQty, inDataId: 'pagesQty', lInnerText: 'PagesQty', inType: 'text', inAutoComplete: 'product-pagesQty' },
    {value: initialValues.language, inDataId: 'language', lInnerText: 'Language', inType: 'text', inAutoComplete: 'product-language' },
  ]

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product added successfully!');
    }
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
