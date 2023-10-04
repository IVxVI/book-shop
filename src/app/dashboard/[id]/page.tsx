'use client'

import { EditProductForm } from '@/components/forms/EditProductForm';
import Loader from '@/components/sections/Loader';
import { fetchProduct } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';

const EditProductPage = ({ params }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetchProduct(params.id as string),
    refetchOnMount: true,
    cacheTime: 1
  });
  
  if(isLoading) {
    return <Loader />
  }

  if(!data) {
    return <h1>No data for this product!</h1>
  }

  return <EditProductForm product={data.data}/>
}

export default EditProductPage;