import ProductList from '@/components/product/ProductList'
import NoProducts from '@/components/sections/NoProducts';
import { getData } from '@/utils/getData';
import React from 'react'

export default async function page() {
  const params = 'others';
  const data = await getData(params);

  if(data.props.products.length === 0) {
    return (
      <NoProducts 
        header="No products here yet :("
        article="Sorry, we couldn’t deliver the products you’re looking for at the time. Please, check our other categories"
      />
    )
  }

  return (
    <ProductList products={data.props.products}/>
  )
}
