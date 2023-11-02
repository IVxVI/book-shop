'use client'

import AddProductForm from '@/components/forms/AddProductForm';
import Loader from '@/components/sections/Loader';
import { fetchProducts } from '@/utils/productsApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react'
import ModalWindow from '@/components/sections/ModalWindow';
import { ButtonLight } from '@/components/sections/ButtonLight';
import ProductList from '@/components/product/ProductList';

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false);
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
        open={openModal}
        setOpen={setOpenModal}
      >
        <AddProductForm />
      </ModalWindow>
      <div className='p-4'>
        <ButtonLight text="Add product" onClick={() => setOpenModal(true)}/>
      </div>
      <Suspense fallback={<Loader />}>
        <ProductList products={products}/>
      </Suspense>
    </>
  )
}
