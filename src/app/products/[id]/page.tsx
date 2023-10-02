'use client'
import Loader from '@/components/sections/Loader';
import { ProductCard } from '@/components/product/XlProductCard'
import { fetchProduct } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function DetailsPage ({ params }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetchProduct(params.id as string),
    refetchOnMount: true
  });
  
  if(isLoading) {
    return <Loader />
  }

  if(!data) {
    return <h1>No data for this product!</h1>
  }
  
  return (
    <ProductCard product={data.data} />
  )
}
