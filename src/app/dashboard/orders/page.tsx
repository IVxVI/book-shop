'use client'

import { fetchOrders } from '@/utils/ordersApi';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loader from '@/components/sections/Loader';
import { OrdersList } from '@/components/tables/OrdersList';
import NoProducts from '@/components/sections/NoProducts';

export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchOnMount: true
  });

  if(!data) {
    return (
      <NoProducts 
        header="No data loaded :("
        article="Sorry, we couldn’t deliver the data you’re looking for at the time. Please, check our possible errors in console"
      />
    )
  }

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
