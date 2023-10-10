'use client'

import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { Formik, Form, Field } from 'formik'
import classNames from 'classnames'
import Link from 'next/link'
import { postContactRequst } from '@/utils/contactsApi'

export default function ContactUs() {
  const [agreed, setAgreed] = useState(false);
  const initialValues = { 
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    resolved: false,
    createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  };

  const contactInputs = [
    {value: initialValues.firstName, inDataId: 'firstName', lInnerText: 'First name', inType: 'text', inAutoComplete: 'given-name' },
    {value: initialValues.lastName, inDataId: 'lastName', lInnerText: 'Last name', inType: 'text', inAutoComplete: 'family-name' },
    {value: initialValues.email, inDataId: 'email', lInnerText: 'Email', inType: 'email', inAutoComplete: 'email' },
    {value: initialValues.phoneNumber, inDataId: 'phoneNumber', lInnerText: 'Phone number', inType: 'tel', inAutoComplete: 'tel' },
  ]


  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
        <p className="text-lg leading-8 text-gray-600">
          We&apos;re thrilled to hear from you and assist with any inquiries or feedback you may have. Whether you&apos;re looking for a specific book, need help with your order, or just want to chat about your favorite reads, we&apos;re here to help.
        </p>
      </div>
      <Formik
        initialValues={{ 
          _id: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
          resolved: false,
          createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        }}

        onSubmit={ async (values, actions) => {
          await postContactRequst(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 2000);
        }}
      >
        {(actions) => (
          <Form className="mx-auto max-w-xl sm:mt-20 px-4">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {
                contactInputs.map(input => (
                  <div key={input.inDataId}>
                    <label htmlFor={input.inDataId} className="block text-sm font-semibold leading-6 text-gray-900">
                      {input.lInnerText}
                    </label>
                    <div className="relative mt-2.5">
                      <Field
                        type={input.inType}
                        name={input.inDataId}
                        id={input.inDataId}
                        autoComplete={input.inAutoComplete}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                ))
              }
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <Field
                    defaultValue={initialValues.message}
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-indigo-600' : 'bg-gray-200',
                      'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <Switch.Label className="text-sm leading-6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <Link href="/" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </Link>
                  .
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="mt-10">
              <button
                disabled={actions.isSubmitting}
                type="submit"
                className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {actions.isSubmitting ? "Sending your message..." : "Let's talk" }
              </button>
            </div>
          </Form>
        )}
        
      </Formik>
    </>
  )
}
