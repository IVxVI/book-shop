import ProductList from '@/components/product/ProductList'
import { getData } from '@/utils/getData';
import React from 'react'

export default async function page() {
  const data = await getData();

  return (
    <ProductList products={data.props.products}/>
  )
}
