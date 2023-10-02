import { FC, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Product } from '@/types/Product';
import { useCartContext } from '@/context/CartContext';
import { addToCart } from '@/utils/cartActions';
import Link from 'next/link';
import classNames from 'classnames';

type Props = {
  product: Product,
}

export const ProductCard: FC<Props> = ({ product }) =>  {
  const { cart, setCart } = useCartContext();
  const [isDisable, setIsDisable] = useState(false);

  const setDisable = () => {
    setIsDisable(true);
    setTimeout(() => {
      setIsDisable(false);
    }, 2000)
  }

  const handleAddToCart = () => {
    addToCart(product, cart, setCart);
    setDisable();
  }
  
  const reviews = { href: '#', average: 4, totalCount: 117 };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <Link href={product._id} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg block">
            <img
              src={product.imgUrl}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">$ {product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <Link href={reviews.href} className="ml-3 text-sm font-medium text-slate-900 hover:text-slate-500">
                  {reviews.totalCount} reviews
                </Link>
              </div>
            </div>

            <button
              disabled={isDisable}
              onClick={handleAddToCart}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 hover:bg-gray-600 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">Author: {product.author}</p>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">Number of pages: {product.pagesQty}</p>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">Language: {product.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}