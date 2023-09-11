import React, { useContext, useEffect } from 'react'
import { deleteProduct, fetchProducts } from '../utils/axiosApi';
import { ProductContext } from '@/context/ProductContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ShoppingBagIcon, TrashIcon, PencilIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname } from "next/navigation";
import { CartContext, useCartContext } from '@/context/CartContext';
import { Product } from '@/types/Product';
import { addToCart } from '@/utils/cartActions';

export default function ProductList() {
  const { products, setProducts } = useContext(ProductContext);
  const route = usePathname();
  const adminRoute = route.includes('dashboard');
  const queryClient = useQueryClient()

  const { data, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    onSuccess(data) {
      setProducts(data)
    },
  });
    
  const {mutate, isLoading} = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product deleted successfully')
    }
  });

  const { cart, setCart } = useCartContext();

  const handleDelete = (productId: string) => {
    mutate(productId);
    setProducts(prevProducts => prevProducts.filter(product => product._id !== productId))
  }

  const handleAddToCart = (productId: string) => {
    const productToAdd = products.find(
      (product: Product) => product._id === productId
    );

    if(productToAdd) {
      addToCart(productToAdd, cart, setCart);
    }
  }

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <article key={product._id} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl flex flex-col justify-between max-w-xs">
          <div>
            <a href={`/dashboard/${product._id}`} className="relative flex items-end overflow-hidden rounded-xl">
              <img className='h-full w-full object-cover object-center group-hover:opacity-75' src={`${product.imgUrl}`} alt={product.title} />
              <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-slate-400 ml-1 text-sm">4.8</span>
              </div>
            </a>

            <div className="mt-1 p-2 flex-grow">
              <h2 className="text-slate-700">{product.title}</h2>
              <p className="text-slate-400 mt-1 text-sm">{product.description}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p>
              <span className="text-lg font-bold text-blue-500">$ {product.price}</span>
            </p>

            {adminRoute 
              ? (
                <>
                  <Link href={`dashboard/${product._id}`} className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                    <PencilIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                  </Link>
                  <div onClick={() => handleDelete(product._id)} className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                    <TrashIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => handleAddToCart(product._id)} className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                    <ShoppingBagIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                  </div>
                  <Link href={`products/${product._id}`} className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                    <EllipsisHorizontalCircleIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                  </Link>
                </>
              )}
          </div>
        </article>
      ))}
    </div>
  )
}
