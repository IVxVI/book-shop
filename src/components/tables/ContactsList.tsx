import { FC } from 'react'
import { ContactRequest } from '@/types/ContactRequest'
import Link from 'next/link'

type Props = {
  contactRequests: ContactRequest[]
}

export const ContactsList: FC<Props> = ({ contactRequests }) => {
  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              User name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Date created
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request: ContactRequest) => (
            
              <tr key={request._id} className="border-b border-gray-200 dark:border-gray-700">
                
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  <Link href={`/dashboard/contact-requests/${request._id}`} >{request.firstName}</Link>
                </th>
                
                <td className="px-6 py-4">
                  {request.email}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 truncate">
                  {request.message}
                </td>
                <td className="px-6 py-4">
                  {request.phoneNumber}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/contact-requests/${request._id}`} >{!request.resolved ? "Pending" : "Resolved"}</Link>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
