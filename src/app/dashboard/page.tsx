'use client'

import AddProductForm from '@/components/forms/AddProductForm';
import ProductList from '@/components/product/ProductList';
import Loader from '@/components/sections/Loader';
import { fetchProducts } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { Product } from '@/types/Product';
import ModalWindow from '@/components/sections/ModalWindow';
import {ButtonLight} from '@/components/sections/ButtonLight';

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const session = useSession();
  const router = useRouter();

  const { isLoading, data } = useQuery(['products'], fetchProducts, {
    onSuccess(data) {
      setProducts(data);
    }
  });

  useEffect(() => {
    if(session.status !== 'authenticated') {
      router.push('/login')
    }
  }, [router, session.status]);
  
  
  const authors = products.map((product: Product) => product.author);
  
  const uniqueAuthors = [...new Set(authors)];

  const visibleData = products.filter((product: Product) => (
    product.title.toUpperCase().includes(searchParams.toUpperCase()))
    || product.description.toUpperCase().includes(searchParams.toUpperCase())
    || product.author === searchParams
  )

  if(isLoading) {
    return <Loader />
  }

  return (
    <>
      <ModalWindow 
        open={open}
        setOpen={setOpen}
      >
        <AddProductForm />
      </ModalWindow>
      <ButtonLight onClick={() => setOpen(true)}/>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
            Author
          </label>
          <select
            onChange={(event) => setSearchParams(event.target.value)}
            name="category"
            id="category"
            multiple={false}
            className="block h-10 appearance-none peer w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {uniqueAuthors.map((author: any) => (
              <option key={authors.indexOf(author)} value={author}>{author}</option>
            ))}
          /</select>
      
        </div>
      </div>

      <ProductList products={visibleData}/>
    </>
  )
}
