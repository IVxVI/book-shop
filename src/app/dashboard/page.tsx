'use client'

import AddProductForm from '@/components/forms/AddProductForm';
import Loader from '@/components/sections/Loader';
import { fetchProducts } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import ModalWindow from '@/components/sections/ModalWindow';
import { ButtonLight } from '@/components/sections/ButtonLight';
import ProductList from '@/components/product/ProductList';

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  const { isLoading, data } = useQuery(['products'], fetchProducts, {
    onSuccess(data) {
      setProducts(data);
    }
  });

  useEffect(() => {
    if(session.status !== 'authenticated') {
      router.push('/login')
    }
  }, [router, session.status]);

  if(isLoading) {
    return <Loader />
  }

  return (
    <>
      <ModalWindow 
        open={open}
        setOpen={setOpen}
      >
        <AddProductForm />
      </ModalWindow>
      <ButtonLight text="Add product" onClick={() => setOpen(true)}/>

      <ProductList products={products}/>
    </>
  )
}
