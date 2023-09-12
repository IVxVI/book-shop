'use client'

import { EditProductForm } from '@/components/EditProductForm';
import Loader from '@/components/Loader';
import Product from '@/models/product';
import { fetchProduct } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

type Props = {
  params: any;
}

const EditProductPage: FC<Props> = ({ params }) => {
  // const { id } = params;

  // const data = await fetchProduct(id);
  
  // return (
  //   data && <EditProductForm product={data.data.product}/>
  // )
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
      data && <EditProductForm product={product}/>
    )
}

export default EditProductPage;