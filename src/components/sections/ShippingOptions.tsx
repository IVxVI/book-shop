import { Order } from '@/types/Order'
import React from 'react'

interface Shipping {
  name: string,
  price: number, 
  terms: string,
}

type Props = {
  shippingOptions: Shipping[], 
  orderData: Order, 
  setOrderData: any
}

export default function ShippingOptions({shippingOptions, orderData, setOrderData}: Props) {
  return (
    <>
      {shippingOptions.map((option: Shipping) => (
        <div key={option.name} className="relative w-full">
          <input
            required
            value={option.name}
            className="peer hidden"
            id={`radio_${option.name}`}
            type="radio"
            name="shipping"
            checked={orderData.shipping === option.name}
            onChange={(event) => setOrderData({...orderData, shipping: event.target.value})}
          />
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor={`radio_${option.name}`}
          >
            <img className="w-14 object-contain" src='https://novaposhta.ua/runtime/cache/320x95/NP_Smilyvist_291_45.png' alt={option.name} />
            <div className="ml-5">
              <span className="mt-2 font-semibold">{option.name}</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: {option.terms}</p>
            </div>
          </label>
        </div>
      ))}
    </>
  )
}
