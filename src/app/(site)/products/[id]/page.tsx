'use client'
import Loader from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/Product';
import { fetchProduct } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function DetailsPage() {
  const path = usePathname();
  const productId = path.split('/')[2];
  const [product, setProduct] = useState<Product | undefined>({
    title: '',
    price: '',
    description: '',
    imgUrl: '',
  })

  const { data, status, isLoading, error } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetchProduct(productId),
    onSuccess(data) {
      setProduct(data?.data.product)
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
