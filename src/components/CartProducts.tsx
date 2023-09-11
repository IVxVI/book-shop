'use client'

import { useOrderContext } from '@/context/OrderContext';
import { CartItem } from '@/types/CartItem';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  cart: CartItem[],
  setCart: any,
}

export const CartProducts: FC<Props> = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const shippingOptions = [
    {name: 'Nova post', price: 120},
    {name: 'Ukrpost', price: 100},
    {name: 'Courier', price: 220},
  ];
  
  const [shipping, setShipping] = useState(shippingOptions[0]);
  const { order, setOrder } = useOrderContext();
  const router = useRouter()
  
  useEffect(() => {
    setTotalPrice(() => {
      return cart.map(cartItem => +cartItem.item.price * cartItem.qty).reduce((acc, curr) => {
        return acc + curr;
      }, 0)
    });

    return () => {
      setTotalPrice(0);
    }
  }, [cart])

  useEffect(() => {
    setOrderPrice(totalPrice + shipping.price);
  }, [shipping.name, shipping.price, totalPrice])

  const handleShippingChange = (event: React.ChangeEvent) => {
    return setOrderPrice(totalPrice + +event.target.value)
  }

  const handleDeleteFromCart = (productId: string) => {
    setCart(cart.filter(cartItem => cartItem.item?._id !== productId))
  }

  const handleQtyChange = (event?: React.ChangeEvent, productId: string) => {
    setCart(
      cart.map(cartItem =>
        cartItem.item._id === productId
          ? { ...cartItem, qty: +event.target.value }
          : cartItem
      )
    );
  }

  const handleAddQty = (productId: string) => {
    setCart(
      cart.map(cartItem =>
        cartItem.item._id === productId && cartItem.qty !== 99
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      )
    );
  }
  
  const handleSubstractQty = (productId: string) => {
    setCart(
      cart.map(cartItem =>
        cartItem.item._id === productId && cartItem.qty !== 1
          ? { ...cartItem, qty: cartItem.qty - 1 }
          : cartItem
      )
    );
  }

  const handleProceedCheckout = () => {
    if(order.length > 0) {
      const newOrder = [...order];

      cart.forEach(cartItem => {
        const existingOrderItemIndex = newOrder.findIndex(orderItem => orderItem.item?._id === cartItem.item?._id);
  
        if (existingOrderItemIndex !== -1) {
          newOrder[existingOrderItemIndex] = {
            ...newOrder[existingOrderItemIndex],
            qty: newOrder[existingOrderItemIndex].qty + cartItem.qty
          };
        } else {
          newOrder.push(cartItem);
        }
      });

      setOrder(newOrder)
    } else {
      setOrder(cart);
    }

    setCart([]);
    router.push('/order');
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.length ? cart.length : 0 } Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {cart.map((cartItem: CartItem) => (
            <div key={cartItem.item?._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={cartItem.item?.imgUrl} alt={cartItem.item?.title} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{cartItem.item?.title}</span>
                  <span className="text-red-500 text-xs">Book</span>
                  <button onClick={() => handleDeleteFromCart(cartItem.item._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg onClick={() => handleSubstractQty(cartItem.item._id)} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>

                <input onChange={(event) => handleQtyChange(event, cartItem.item._id)} className="mx-2 border text-center w-8" type="text" value={cartItem.qty} />

                <svg onClick={() => handleAddQty(cartItem.item._id)} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">$ {cartItem.item.price}</span>
              <span className="text-center w-1/5 font-semibold text-sm">$ {cartItem.item.price * cartItem.qty}</span>
            </div>
          ))}

          <Link href="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">{cart.length ? cart.length : 0 } Items</span>
            <span className="font-semibold text-sm">{totalPrice} $</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select onChange={handleShippingChange} className="block p-2 text-gray-600 w-full text-sm">
              {shippingOptions.map(option => (
                <option value={option.price} key={option.name}>{option.name} : {option.price}$</option>
              ))}
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$ {orderPrice}</span>
            </div>
            <button onClick={handleProceedCheckout} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
