'use client'

import { EditProductForm } from '@/components/EditProductForm';
import { fetchProduct } from '@/utils/axiosApi';
import { FC } from 'react';

type Props = {
  params: any;
}

const EditProductPage: FC<Props> = async ({ params }) => {
  const { id } = params;

  const { data } = await fetchProduct(id);
  
  return (
    data && <EditProductForm product={data.product}/>
  )
}

export default EditProductPage;