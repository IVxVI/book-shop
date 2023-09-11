'use client'

import React from 'react'
import { CartProducts } from '@/components/CartProducts'
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useOrderContext } from '@/context/OrderContext';

export default function Cart() {
  const { cart, setCart } = useCartContext();
  const { order } = useOrderContext();

  return (
    <>
      <section className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
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
              <Link className="font-semibold text-gray-900" href="/products">Shop</Link>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/cart">2</Link>
              <span className="font-semibold text-gray-900">Cart</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li>
              <button className="flex flex-row space-x-4 sm:space-x-4">
                {order.length > 0 ? (
                  <>
                    <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="/order">3</Link>
                    <Link className={`font-semibold text-${order.length > 0 ? 'gray-500' : 'gray-300'}`} href="/order">Order</Link>
                  </>
                ) : (
                  <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white cursor-not-allowed">3</span>
                    <span className={`font-semibold text-${order.length > 0 ? 'gray-500' : 'gray-300'} cursor-not-allowed`}>Order</span>
                  </> 
                )}
              </button>
            </li>
          </ul>
        </div>
      </section>
      <CartProducts cart={cart} setCart={setCart} />
    </>
  )
}
