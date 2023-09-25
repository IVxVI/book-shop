'use client'

import { EditProductForm } from '@/components/EditProductForm';
import Loader from '@/components/Loader';
import { fetchProduct } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const EditProductPage = ({ params }: any) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    imgUrl: '',
  })

  const { data, status, isLoading, error } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetchProduct(params.id as string),
    onSuccess(data) {
      if(data) {
        const productData = data.data;
        setProduct(productData);
      }
    },
  });
  
  if(isLoading) {
    return <Loader />
  }

  if(!data) {
    return <h1>No data for this product!</h1>
  }

  return (
      data && <EditProductForm product={product}/>
    )
}

export default EditProductPage;