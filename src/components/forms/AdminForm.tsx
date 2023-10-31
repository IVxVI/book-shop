import { Product } from '@/types/Product';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import FormButton from '../sections/FormButton';
import * as Yup from 'yup';
import ErrorText from '../order/ErrorText';

interface Value {
  inDataId: string, 
  lInnerText: string, 
  inType: string, 
  inAutoComplete: string 
}

type Props = {
  initialValues: Product,
  dataInputs: Value[],
  mutate: UseMutateFunction<AxiosResponse<any, any> | undefined, unknown, Product, unknown>,
  status: "error" | "idle" | "loading" | "success",
}

export default function AdminForm({initialValues, dataInputs, mutate, status}: Props) {
  const router = useRouter();

  const ProductSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, 'Too Short!')
      .max(60, 'Too Long!')
      .required('Required'),
    price: Yup.number()
      .min(1, 'Too cheap!')
      .max(9999, 'Too Expensive!')
      .required('Required'),
    description: Yup.string()
      .min(25, 'Too Short!')
      .max(999, 'Too Long!')
      .required('Required'),
    imgUrl: Yup.string()
      .matches(/^(https?:\/\/)?[a-zA-Z0-9_-]+\.[a-zA-Z0-9-_.]+(\/[a-zA-Z0-9-_.]+)*(\/[a-zA-Z0-9-_.]+\.(jpg|jpeg|png|gif|bmp|svg|webp))$/, { message: 'Please, keep up to the URL format!', excludeEmptyString: true })
      .required('Required'),
    author: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    pagesQty: Yup.number()
      .min(2, 'Too short!')
      .max(9999, 'Too big!')
      .required('Required'),
    language: Yup.string()
      .matches(/^[A-Z][A-Za-z\s]{0,14}$/, { message: 'Please, follow the standart: "English", "Ukrainian", etc', excludeEmptyString: true }),
    category: Yup.string()
      .required('Required'),
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={ async (values, actions) => {        
        await sleep(500);
        mutate(values);

        if(status !== 'error' && status !== 'loading') {
          router.push('/dashboard')
        }
      }}
    >
      {({ handleChange, isSubmitting, isValid }) => {

        return (
        <Form className="mx-auto mt-4 max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {
              dataInputs.map(input => (
                <div key={input.inDataId}>
                  <label htmlFor={input.inDataId} className="block text-sm font-semibold leading-6 text-gray-900">
                    {input.lInnerText}
                  </label>
                  <div className="relative mt-2.5">
                    <Field
                      onChange={handleChange}
                      type={input.inType}
                      
                      name={input.inDataId}
                      id={input.inDataId}
                      autoComplete={input.inAutoComplete}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorText>
                      <ErrorMessage name={input.inDataId} />
                    </ErrorText>
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
            <FormButton
              text="Submit"
              isSubmitting={isSubmitting}
              isValid={isValid}
            />
          </div>
        </Form>
      )}}
    </Formik>
  )
}
