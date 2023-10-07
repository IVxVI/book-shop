import { Field } from 'formik'
import React from 'react'

type Props = {
  label: string,
  id: string, 
  type: string, 
  name: string
  handleChange: any 
}

export default function FormField({label, id, type, name, handleChange}: Props) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mt-4 mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2.5">
        <Field
          onChange={handleChange}
          type={type}
          name={name}
          id={id}
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}
