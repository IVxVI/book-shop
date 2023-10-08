import { CartItem } from '@/types/CartItem'
import { Order } from '@/types/Order'
import { Product } from '@/types/Product'
import classNames from 'classnames'
import React from 'react'

type Props = {
  text: string,
  isSubmitting: boolean,
  data?: Product[] | CartItem[] | Order[],
  isValid?: boolean
}

export default function FormButton({text, isSubmitting, data, isValid}: Props) {
  const noData = data?.length === 0;
  
  return (
    <button 
      type="submit"
      disabled={isSubmitting || noData || !isValid}
      className={classNames(
        "mt-4 mb-8 w-full rounded-md hover:bg-gray-600 px-6 py-3 font-medium text-white",
        {'bg-gray-600': isSubmitting || noData || !isValid},
        {'bg-gray-900': !noData && isValid && !isSubmitting},
      )}>
      {isSubmitting ? 'Submitting...' : text}
    </button>
  )
}
