import { Field } from 'formik'
import React from 'react'

type Props = {
  handleChange: any 
}
export default function AddressInputs({handleChange}: Props) {
  return (
    <>
      <label htmlFor="address.street" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full flex-shrink-0 sm:w-7/12">
          <Field required onChange={handleChange} type="text" id="address.street" name="address.street" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
          
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/abbc364f96859becf24ebdf7cf00d29d.svg" alt="flag" />
          </div>
        </div>
        
        <label htmlFor="address.city"></label>
        <Field required onChange={handleChange} type="text" id="address.city" name="address.city" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="City" />
        
        <label htmlFor="address.zip"></label>
        <Field required onChange={handleChange} type="text" id="address.ZIP" name="address.ZIP" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
      </div>
    </>
  )
}
