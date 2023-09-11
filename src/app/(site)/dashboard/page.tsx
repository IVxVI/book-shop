'use client'

import AddProductForm from '@/components/AddProductForm';
import ProductList from '@/components/ProductList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session.status !== 'authenticated') {
      router.push('/login')
    }
  }, [session.status, router])

  return (
    <div>
      <h1>Hello, {session?.data?.user?.name}</h1>
      <AddProductForm />
      <ProductList />
    </div>
  )
}
