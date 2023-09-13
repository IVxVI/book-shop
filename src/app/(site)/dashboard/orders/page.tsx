'use client'

import { Order } from '@/types/Order';
import { fetchOrders } from '@/utils/axiosApi';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);

  const { data, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    onSuccess(data) {
      setOrdersData(data?.data)
    },
  });


  const callouts = ordersData.map((order: Order) => {
    return {
      name: `${order._id}, resolved: ${order.resolved}`,
      description: `${order.products.length} product (s), total price: $${order.totalPrice}`,
      imageSrc: `${order.products[0].item?.imgUrl}`,
      imageAlt: `Order of ${order.customer}`,
      href: `/dashboard/orders/${order._id}`,
    }
  })

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:py-16 sm:py-24 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
