
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingBagIcon, TrashIcon, PencilIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import { usePathname } from "next/navigation";
import { deleteProduct } from '@/utils/productsApi';
import Link from 'next/link';
import classNames from 'classnames';
import { Product } from '@/types/Product';

type Props = {
  product: Product,
  handleAddToCart: (arg: string) => void,
  disabled: boolean
}

export default function XsProductCard({product, handleAddToCart, disabled}: Props) {
  const route = usePathname();
  const adminRoute = route.includes('dashboard');

  const queryClient = useQueryClient();
    
  const { mutate, isLoading } = useMutation(deleteProduct, {
    onMutate: async () => {
      await queryClient.cancelQueries(['products']);

      const prevProducts = queryClient.getQueryData(['products'])

      queryClient.setQueryData(['products'], (prevProducts || []))

      return { prevProducts }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(['products'], () => context?.prevProducts)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['products'])
    }
  });

  const handleDelete = (productId: string) => {
    mutate(productId);
  }

  return (
    <article className={classNames(
        "rounded-xl bg-white p-2 shadow-lg hover:shadow-xl flex flex-col justify-between max-w-xs",
        { "opacity-20" : isLoading}
      )}>
        <section>
          <Link href={adminRoute ? `/dashboard/${product._id}` : `/products/${product._id}`} className="relative flex items-end overflow-hidden rounded-md">
            <img className='h-full w-full object-cover object-center group-hover:opacity-75' src={`${product.imgUrl}`} alt={product.title} />
            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md bg-opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-slate-800 ml-1 text-sm">4.8</span>
            </div>
          </Link>

          <div className="mt-1 flex-grow">
            <h2 className="text-slate-700">{product.title}</h2>
            <p className="text-slate-400 mt-1 text-sm truncate">{product.description}</p>
          </div>
        </section>
        <div className="mt-3 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-blue-500">$ {product.price}</span>
          </p>

          {adminRoute 
            ? (
              <>
                <Link href={`/dashboard/${product._id}`} className="group inline-flex rounded-md bg-blue-100 p-2 hover:bg-blue-200">
                  <PencilIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                </Link>
                <button disabled={disabled} onClick={() => handleDelete(product._id)} className="group inline-flex rounded-md bg-blue-100 p-2 hover:bg-blue-200">
                  <TrashIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                </button>
              </>
            ) : (
              <>
                <button disabled={disabled} onClick={() => handleAddToCart(product._id)} className="group inline-flex rounded-md bg-blue-100 p-2 hover:bg-blue-200">
                  <ShoppingBagIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                </button>
                <Link href={`/products/${product._id}`} className="group inline-flex rounded-md bg-blue-100 p-2 hover:bg-blue-200">
                  <EllipsisHorizontalCircleIcon className="group-hover:text-blue-500 h-4 w-4 text-blue-400" fill="currentColor"/>
                </Link>
              </>
            )}
        </div>
      </article>
  )
}
