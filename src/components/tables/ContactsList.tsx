import { FC } from 'react'
import { ContactRequest } from '@/types/ContactRequest'
import Link from 'next/link'

type Props = {
  contactRequests: ContactRequest[]
}

export const ContactsList: FC<Props> = ({ contactRequests }) => {
  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen bg-gray-50">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              User name
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-100">
              Email
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Message
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-100">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Date created
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-100">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request: ContactRequest) => (
              <tr key={request._id} className="border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  <Link href={`/dashboard/contact-requests/${request._id}`} >{request.firstName}</Link>
                </th>
                <td className="px-6 py-4 bg-gray-100">
                  {request.email}
                </td>
                <td className="px-6 py-4 bg-gray-50 truncate">
                  {request.message}
                </td>
                <td className="px-6 py-4 bg-gray-100">
                  {request.phoneNumber}
                </td>
                <td className="px-6 py-4 bg-gray-50">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4 bg-gray-100">
                  <Link href={`/dashboard/contact-requests/${request._id}`} >{!request.resolved ? "Pending" : "Resolved"}</Link>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
