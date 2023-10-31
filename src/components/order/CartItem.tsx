import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItem } from '@/types/CartItem'


type Props = {
  cartItem: CartItem,
  extended: boolean,
  handleRemove: (arg: string) => void,
  handleSubstract: (arg: string) => void,
  handleAdd: (arg: string) => void,
  handleQty: (arg1: React.ChangeEvent<HTMLInputElement>, arg2: string) => void
}

export default function CartItem({ cartItem, extended, handleRemove, handleQty, handleAdd, handleSubstract }: Props) {
  const { item, qty } = cartItem;

  return ( extended ? (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b">
      <div className="flex w-2/5">
        <div className="hidden sm:block max-w-[24%] lg:border">
          <Image height={100} width={100} className="object-cover w-full border" src={item.imgUrl} alt={item.title} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <div className='flex flex-col gap-2'>
            <span className="font-bold text-sm">{item.title}</span>
            <span className="text-slate-500 text-xs">{item.author}</span>
          </div>

          <button onClick={() => handleRemove(item._id)} className="font-semibold self-start hover:text-red-600 text-gray-500 text-xs">Remove</button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <svg onClick={() => handleSubstract(item._id)} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
        </svg>

        <input onChange={(event) => handleQty(event, item._id)} className="mx-2 border text-center w-8" type="text" value={qty} />
        <svg onClick={() => handleAdd(item._id)} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
        </svg>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">$ {item.price}</span>
      <span className="text-center w-1/5 font-semibold text-sm">$ {+item.price * qty}</span>
    </div>
    ) : (
      <li className="flex py-6">
        <div className="h-24 w-18 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image 
            height={100} width={100}
            src={item.imgUrl}
            alt={item.title}
            className="h-full w-full object-contain object-center bg-slate-600"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link href={item._id}>{item.title}</Link>
              </h3>
              <p className="ml-4">{item.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{item.author}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty {qty}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-red-300 hover:text-red-500"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  )
}
