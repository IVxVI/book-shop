'use client'

import OrderCustomerDetails from "@/components/OrderCustomerDetails";
import OrderDetails from "@/components/OrderDetails";
import { fetchOrder } from "@/utils/axiosApi";
import trimId from "@/utils/trimId";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function OrderSummary({ params }: any) {
  const shippingOptions = [
    {name: 'Nova post', price: 120.00, terms: '1-3 working days', href: 'https://novaposhta.ua/privatnim_klientam/ceny_i_tarify'},
    {name: 'Ukrpost', price: 100.00, terms: '3-5 working days', href: 'https://ukrposhta.ua/ua/standart'},
    {name: 'Courier', price: 220.00, terms: '1-2 working days', href: ''},
  ]

  const [orderData, setOrderData] = useState({
    _id: '',
    resolved: '',
    createdAt: '',
    orderId: '',
    phone: '',
    email: '',
    customer: '',
    address: {
      street: '',
      city: '',
      ZIP: ''
    },
    shipping: {},
    productsPrice: 0,
    totalPrice: 0,
    products: []
  });

  const { data, isError } = useQuery({
    queryKey: ['order'],
    queryFn: () => fetchOrder(params.id as string),
    onSuccess(data) {
      setOrderData(data?.data)
    },
  });

  const customerData = {
    phone: orderData.phone,
    email: orderData.email,
    customer: orderData.customer,
    address: orderData.address,
  }

  const callout = {
    id: orderData.orderId,
    name: orderData.customer,
    createdAt: orderData.createdAt,
    products: orderData.products,
    subTotal: orderData.productsPrice,
    total: orderData.totalPrice,
    shipping: shippingOptions.find(option => orderData.shipping === option.name),
  }

  return (
    <section className="bg-gray-100 py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #{callout.id}</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Order placed: ${callout.createdAt}</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <OrderDetails {...callout} />
        <OrderCustomerDetails {...customerData} />
      </div>
    </section>
  )
}
