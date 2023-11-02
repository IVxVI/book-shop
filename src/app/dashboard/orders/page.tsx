'use client'

import { fetchOrders } from '@/utils/ordersApi';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loader from '@/components/sections/Loader';
import { OrdersList } from '@/components/tables/OrdersList';

export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchOnMount: true
  });

  return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Suspense fallback={<Loader />}>
            <OrdersList orders={data?.data}/>
          </Suspense>
        </div>
      </section>
  )
}
