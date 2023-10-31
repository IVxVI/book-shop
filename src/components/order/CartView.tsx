'use client'

import { useOrderContext } from '@/context/OrderContext';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonLight } from '../sections/ButtonLight';
import Link from 'next/link';
import { CartItem } from '@/types/CartItem';
import CartItemsList from './CartItemsList';
import { handleCheckout } from '@/utils/cartActions';

type Props = {
  cart: CartItem[],
  setCart: any
}

export const CartView = ({ cart, setCart }: Props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { order, setOrder } = useOrderContext();
  const router = useRouter()
  
  useEffect(() => {
    setTotalPrice(() => {
      return cart.map((cartItem: CartItem) => +cartItem.item.price * cartItem.qty).reduce((acc: any, curr: any) => {
        return acc + curr;
      }, 0)
    });
  }, [cart])

  const handleProceedCheckout = () => {
    handleCheckout(order, setOrder, cart, setCart, router);
  }

  return (
    <section className="border container mx-auto mt-10 overflow-hidden flex flex-col sm:flex-row shadow my-10 lg:-ml-1">
      <article className="w-full sm:w-3/4 bg-white px-4 sm:px-10 py-10">
        <div className="flex justify-between border-b pb-4">
          <h1 className="font-semibold text-lg sm:text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-lg sm:text-2xl">{cart.length ? cart.length : 0} Items</h2>
        </div>
        <div className="flex mt-6 mb-3 sm:mt-10 sm:mb-5">
          <h3 className="font-semibold text-gray-600 text-xs sm:text-sm uppercase w-2/5">Product</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs sm:text-sm uppercase w-1/5">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs sm:text-sm uppercase w-1/5">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs sm:text-sm uppercase w-1/5">Total</h3>
        </div>
        <CartItemsList cart={cart} setCart={setCart} extended={true} />
        <div className="text-start mt-6 sm:mt-10">
          <Link href="/products" className="font-semibold text-gray-600 text-sm hover:text-emerald-600">
            Continue Shopping
          </Link>
        </div>
      </article>

      <aside className="w-full sm:w-1/4 px-4 sm:px-8 py-10 bg-gray-100 flex flex-col justify-start">
        <h2 className="font-semibold text-lg sm:text-2xl border-b pb-4">Order Summary</h2>
        <div className="mt-8 lg:mt-14 flex justify-center flex-col">
          <div className="flex flex-col justify-between gap-1 py-6 text-sm">
            {cart.map((cartItem: CartItem) => (
              <React.Fragment key={cartItem.item._id}>
                <span  className='hover:text-red-600 font-extralight text-gray-500 text-xs/5' >{`${cartItem.item.title}`}</span>
                <span className='hover:text-red-600 font-extralight text-gray-500 text-xs/5' >{`$${+cartItem.item.price * cartItem.qty}`}</span>
              </React.Fragment>
            ))}
            <span className='font-semibold'><strong>TOTAL PRICE: ${totalPrice}</strong></span>
          </div>

          <ButtonLight 
            text="Checkout"
            onClick={handleProceedCheckout}
          />
        </div>
      </aside>
    </section>
  )
}
