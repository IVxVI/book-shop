import React from 'react'

export default function OrderInvoice() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-2xl mx-auto py-0 md:py-16">
        <article className="shadow-none md:shadow-md md:rounded-md overflow-hidden">
          <div className="md:rounded-b-md  bg-white">
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-6">
                <div className="flex justify-between items-top">
                  <div className="space-y-4">
                    <div>
                      <img className="h-6 object-cover mb-4" src="https://cdn.mjwebs.com/sites/mjwebs/mjwebs-logo.png" />
                      <p className="font-bold text-lg"> Invoice </p>
                      <p> MJWebs </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-400"> Billed To </p>
                      <p> Tony Stark </p>
                      <p> tony@starkindustriesxyz.com </p>
                      <p> (02) 1234 1234 </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-sm text-gray-400"> Invoice Number </p>
                      <p> INV-MJ0001 </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-400"> Invoice Date </p>
                      <p> 31 December 2021 </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-400"> ABN </p>
                      <p> 57 630 182 446 </p>
                    </div>
                    <div>
                      <a href="#" target="_blank" className="inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "> Download PDF <svg className="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a href="#" target="_blank" className="inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "> Pay Balance <svg className="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-9 border-b border-gray-200">
              <p className="font-medium text-sm text-gray-400"> Note </p>
              <p className="text-sm"> Thank you for your order. </p>
            </div>
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th scope="col" className="px-9 py-4 text-left font-semibold text-gray-400"> Item </th>
                  <th scope="col" className="py-3 text-left font-semibold text-gray-400">  </th>
                  <th scope="col" className="py-3 text-left font-semibold text-gray-400"> Amount </th>
                  <th scope="col" className="py-3 text-left font-semibold text-gray-400"> Discount </th>
                  <th scope="col" className="py-3 text-left font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                    <div>
                      <p> Jericho III (YA-4) </p>
                      <p className="text-sm text-gray-400"> Nuclear-armed ICBM </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-gray-600 truncate"></td>
                  <td className="whitespace-nowrap text-gray-600 truncate"> $380,000.00 </td>
                  <td className="whitespace-nowrap text-gray-600 truncate"> 0% </td>
                </tr>
                <tr>
                  <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                    <div>
                      <p> Pym Particles (Pack of 10,000) </p>
                      <p className="text-sm text-gray-400"> Redacted Description </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-gray-600 truncate"></td>
                  <td className="whitespace-nowrap text-gray-600 truncate"> $280,000.00 </td>
                  <td className="whitespace-nowrap text-gray-600 truncate"> 0% </td>
                </tr>
              </tbody>
            </table>
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm"> Subtotal </p>
                  </div>
                  <p className="text-gray-500 text-sm"> $660,000.00 </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm"> Tax </p>
                  </div>
                  <p className="text-gray-500 text-sm"> $0.00 </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm"> Total </p>
                  </div>
                  <p className="text-gray-500 text-sm"> $660,000.00 </p>
                </div>
              </div>
            </div>
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-black text-lg"> Amount Due </p>
                  </div>
                  <p className="font-bold text-black text-lg"> $360.00 </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
