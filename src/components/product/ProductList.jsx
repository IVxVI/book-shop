'use client'

import React, { useState } from 'react'
import { useCartContext } from '@/context/CartContext';
import { addToCart } from '@/utils/cartActions';
import XsProductCard from './XsProductCard';

export default function ProductList({ products }) {
  const { cart, setCart } = useCartContext();
  const [isDisable, setIsDisable] = useState(false);
  
  const setDisable = () => {
    setIsDisable(true);
    setTimeout(() => {
      setIsDisable(false);
    }, 2000)
  }

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(
      (product) => product._id === productId
    );

    if(productToAdd) {
      addToCart(productToAdd, cart, setCart);
      setDisable();
    }
  }
  

  return (
    <section className="py-4 mx-auto grid max-w-screen-xl grid-cols-2 gap-12 p-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <React.Fragment key={product._id}>
          <XsProductCard 
            product={product}
            handleAddToCart={handleAddToCart}
            disabled={isDisable}
          />
        </React.Fragment>
      ))}
    </section>
  )
}
