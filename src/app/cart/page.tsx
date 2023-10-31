'use client'

import React from 'react'
import { useCartContext } from '@/context/CartContext';
import NoProducts from '@/components/sections/NoProducts';
import { CartView } from '@/components/order/CartView';

export default function Cart() {
  const { cart, setCart } = useCartContext();

  if(cart.length === 0) {
    return (
      <NoProducts
        header="Your cart is still empty..."
        article="Let`s fix this immediately!"
      />
    ) 
  }

  return (
    <CartView cart={cart} setCart={setCart} />
  )
}
