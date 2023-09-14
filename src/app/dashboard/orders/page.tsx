'use client'

import { Order } from '@/types/Order';
import { fetchOrders } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);

  const { data, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    onSuccess(data) {
      setOrdersData(data?.data)
    },

    refetchOnMount: true
  });

  const shippingOptions = [
    {name: 'Nova post', price: 120.00, terms: '1-3 working days', href: 'https://novaposhta.ua/privatnim_klientam/ceny_i_tarify'},
    {name: 'Ukrpost', price: 100.00, terms: '3-5 working days', href: 'https://ukrposhta.ua/ua/standart'},
    {name: 'Courier', price: 220.00, terms: '1-2 working days', href: ''},
  ]


  const callouts = ordersData.map((order: Order) => {
    return {
      id: order._id,
      name: order.customer,
      createdAt: order.createdAt,
      description: `${order.products.length} product (s), total price: $${order.totalPrice}`,
      products: order.products,
      subTotal: order.productsPrice,
      total: order.totalPrice,
      shipping: shippingOptions.find(option => order.shipping === option.name),
      href: `/dashboard/orders/${order._id}`,
    }
  })

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {callouts.map((callout) => (
            <div key={callout.id} className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">    
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  <Link href={callout.href}>Order # {callout.id}</Link>
                </h2>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Order placed at: {callout.createdAt}</p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                    
                    {callout.products.map(product => (
                      <div key={product.item?._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img className="w-full hidden md:block" src={product.item?.imgUrl} alt={product.item?.title} />
                          <img className="w-full md:hidden" src={product.item?.imgUrl} alt={product.item?.title} />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product.item?.title}</h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Author: </span> Anonymous</p>
                              <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Print length: </span> 604</p>
                              <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Language: </span> English</p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base dark:text-white xl:text-lg leading-6">$ {product.item?.price}</p>
                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.qty}</p>
                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$ {+product.item?.price * product.qty}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {callout.subTotal}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {callout.shipping?.price}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${callout.total}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">{callout?.shipping?.name}<br /><span className="font-normal">Delivery with {callout.shipping?.terms}</span></p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">${callout.shipping?.price}</p>
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <Link href={callout.shipping.href} className="text-center hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
