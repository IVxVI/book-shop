"use client"

import React from 'react'
import { Checkout } from '@/components/order/Checkout'
import { useOrderContext } from '@/context/OrderContext';
import Link from 'next/link';

export default function Orders() {
  const { order, setOrder } = useOrderContext();

  return (
    <>
      <section className="flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="text-2xl font-bold text-gray-800">
          <span>progress</span>
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="/products">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </Link>
              <Link href="/products" className="font-semibold text-gray-900">Shop</Link>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </Link>
              <Link href="/cart" className="font-semibold text-gray-900">Cart</Link>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/order">3</Link>
              <Link href='/order' className="font-semibold text-gray-500">Order</Link>
            </li>
          </ul>
        </div>
      </section>
      
      <Checkout order={order} setOrder={setOrder} />
    </>
  )
}
