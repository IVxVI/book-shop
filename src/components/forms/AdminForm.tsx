import { Product } from '@/types/Product';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Value {
  value: string, 
  inDataId: string, 
  lInnerText: string, 
  inType: string, 
  inAutoComplete: string 
}

type Props = {
  initialValues: Product,
  dataInputs: Value[],
  mutate: UseMutateFunction<AxiosResponse<any, any> | undefined, unknown, Product, unknown>,
  isLoading: boolean
}

export default function AdminForm({initialValues, dataInputs, mutate, isLoading}: Props) {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={ (values, actions) => {
        mutate(values);
        setTimeout(() => {
          actions.setSubmitting(false);
          actions.resetForm({values: {
            title: '',
            price: '',
            description: '',
            imgUrl: '',
            author: '',
            pagesQty: '',
            language: '',
            category: 'books-comics',
            _id: ''
          }});
          router.push('/dashboard')
        }, 2000);
      }}
    >
      {(actions) => (
        <Form className="mx-auto mt-4 max-w-xl ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {
              dataInputs.map(input => (
                <div key={input.inDataId}>
                  <label htmlFor={input.inDataId} className="block text-sm font-semibold leading-6 text-gray-900">
                    {input.lInnerText}
                  </label>
                  <div className="relative mt-2.5">
                    <Field
                      onChange={actions.handleChange}
                      type={input.inType}
                      defaultValue={input.value}
                      name={input.inDataId}
                      id={input.inDataId}
                      autoComplete={input.inAutoComplete}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ))
            }
            <div>
              <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
                Category
              </label>
              <div className="relative mt-2.5">
                <Field
                  component="select"
                  name="category"
                  id="category"
                  multiple={false}
                  className="block h-10 appearance-none peer w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="books-comics">Books & Comics</option>
                  <option value="office-supplies">Office Supplies</option>
                  <option value="other">Other</option>
                </Field>
              </div>
            </div>
            
          </div>
            <div className="mt-10 grid place-items-center">
              <button
                disabled={actions.isSubmitting || isLoading}
                type="submit"
                className="block max-w-xs w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {actions.isSubmitting || isLoading ? "Submitting..." : "Submit" }
              </button>
            </div>
        </Form>
      )}
    </Formik>
  )
}
