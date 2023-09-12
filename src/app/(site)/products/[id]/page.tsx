'use client'
import Loader from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/Product';
import { fetchProduct } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function DetailsPage({ params }) {
  const [product, setProduct] = useState<Product>({
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
    product && <ProductCard product={product} />
  )
}
