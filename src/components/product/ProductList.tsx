'use client'

import React, { useState } from 'react'
import { useCartContext } from '@/context/CartContext';
import { addToCart } from '@/utils/cartActions';
import XsProductCard from './XsProductCard';
import { Product } from '@/types/Product';

type Props = {
  products: Product[]
}

function ProductList({ products }: Props) {
  const { cart, setCart } = useCartContext();
  const [isDisable, setIsDisable] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const authors = products.map((product) => product.author);
  const uniqueAuthors = [...new Set(authors)];

  const visibleData = products.filter((product) => (
    product.title.toUpperCase().includes(searchParams.toUpperCase()))
    || product.description.toUpperCase().includes(searchParams.toUpperCase())
    || product.author === searchParams
  )

  const setDisable = () => {
    setIsDisable(true);
    setTimeout(() => {
      setIsDisable(false);
    }, 2000)
  }

  const handleAddToCart = (productId: string) => {
    const productToAdd = products.find(
      (product) => product._id === productId
    );

    if(productToAdd) {
      addToCart(productToAdd, cart, setCart);
      setDisable();
    }
  }
  

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-4">
        <div className="relative mt-2.5">
          <label htmlFor="search-input" className="block text-sm font-semibold leading-6 text-gray-900">
            Search by title or description
          </label>
          <input
            value={searchParams}
            onChange={(event) => setSearchParams(event.target.value)}
            type="text"
            name="search-input"
            id="search-input"
            className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="relative mt-2.5">
          <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
            Author / Manufacturer
          </label>
          <select
            onChange={(event) => setSearchParams(event.target.value)}
            name="category"
            id="category"
            multiple={false}
            className="block h-10 appearance-none peer w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {uniqueAuthors.map((author) => (
              <option key={authors.indexOf(author)} value={author}>{author}</option>
            ))}
          /</select>
      
        </div>
      </div>

      <section className="p-4 mx-auto grid max-w-screen-xl gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {visibleData.map(product => (
          <React.Fragment key={product._id}>
            <XsProductCard 
              product={product}
              handleAddToCart={handleAddToCart}
              disabled={isDisable}
            />
          </React.Fragment>
        ))}
      </section>
    </>
  )
}

export default React.memo(ProductList);
