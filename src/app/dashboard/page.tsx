'use client'

import AddProductForm from '@/components/forms/AddProductForm';
import ProductList from '@/components/product/ProductList';
import Loader from '@/components/sections/Loader';
import { fetchProducts } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Product } from '@/types/Product';

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [searchParams, setSeatchParams] = useState('')

  useEffect(() => {
    if(session.status !== 'authenticated') {
      router.push('/login')
    }
  }, [router, session.status]);

  const { isLoading, data } = useQuery(['products'], fetchProducts);

  if(isLoading) {
    return <Loader />
  }

  const authors = data.map((product: Product) => product.author);

  const uniqueAuthors = [...new Set(authors)];

  const visibleData = data.filter((product: Product) => (
    product.title.toUpperCase().includes(searchParams.toUpperCase()))
    || product.description.toUpperCase().includes(searchParams.toUpperCase())
    || product.author === searchParams
  )
  return (
    <section>
      <Menu as="div" className="relative text-left w-full">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Add product
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white bg-opacity-90 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                <AddProductForm />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="relative mt-2.5">
          <label htmlFor="search-input" className="block text-sm font-semibold leading-6 text-gray-900">
            Search by title or description
          </label>
          <input
            value={searchParams}
            onChange={(event) => setSeatchParams(event.target.value)}
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
            onChange={(event) => setSeatchParams(event.target.value)}
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
    </section>
  )
}
