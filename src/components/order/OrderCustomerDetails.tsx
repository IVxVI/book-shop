import { CustomerData } from '@/types/CustomerData'
import React from 'react'


export default function OrderCustomerDetails(customerData: CustomerData) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-center items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-center items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 lg:mt-4">
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-start md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-start md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">{customerData.customer}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-start md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-start md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Contacts: </p>
                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Phone: {customerData.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center py-4 border-b border-gray-200 w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="cursor-pointer text-sm leading-5">Email: {customerData.email}</p>
          </div>
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">ZIP-code: {customerData.address.ZIP}</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">City: {customerData.address.city}</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Street: {customerData.address.street}</p>
            </div>
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}
