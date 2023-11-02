import { Order } from '@/types/Order'
import Link from 'next/link'
import React, { FC } from 'react'
import DropDown from '../sections/DropDown'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteOrder } from '@/utils/ordersApi'
import classNames from 'classnames'

type Props = {
  orders: Order[]
}

export const OrdersList: FC<Props> = ({ orders }) => {
  const tHeads = [
    'Invoice', 'Amount', 'Issued / Due', 'Status'
  ];

  const queryClient = useQueryClient();
    
  const {mutate, isLoading} = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  if(orders.length === 0) {
    return <h1>No orders loaded!</h1>
  }

  
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8 relative">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <table className="min-w-full leading-normal ">
              <thead>
                <tr>
                  {tHeads.map(thead => (
                    <th
                      key={thead}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {thead}
                    </th>
                  ))}
                  <th
                    className="relative px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const dropDownOptions = [
                    {title: "Delete", onClick: () => mutate(order._id), href: ''},
                    {title: "Edit", onClick: () => {}, href: ''},
                    {title: "Details", onClick: () => {}, href: `/dashboard/orders/${order._id}`}
                  ];

                return (
                  <tr key={order._id} className={classNames({
                    'opacity-70' : isLoading
                  })}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.customer}
                          </p>
                          <Link href={`/dashboard/orders/${order._id}`} className="text-gray-600 whitespace-no-wrap">{order.orderId}</Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">$ {order.totalPrice}</p>
                      <p className="text-gray-600 whitespace-no-wrap">USD</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{order.createdAt}</p>
                      <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{order.resolved ? 'Resolved' : 'Pending'}</span>
                      </span>
                    </td>
                    <td
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <DropDown options={dropDownOptions} />
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
