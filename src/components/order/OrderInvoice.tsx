import { CartItem } from '@/types/CartItem';
import { Order } from '@/types/Order';
import { FC } from 'react';

type Props = {
  orderData: Order
}

export const OrderInvoice: FC<Props> = ({ orderData }) => {
  const {
    createdAt,
    orderId,
    customer,
    phone,
    email,
    productsPrice,
    totalPrice,
    products
  } = orderData;

  return (
    <section className="mx-auto py-0">
      <article className="shadow-none md:shadow-md md:rounded-md overflow-hidden">
        <div className="md:rounded-b-md  bg-white">
          <div className="p-9 border-b border-gray-200">
            <div className="space-y-6">
              <div className="flex justify-between items-top flex-col sm:flex-row">
                <div className="space flex flex-col">
                  <p className="font-medium text-xs md:text-sm text-gray-400"> Billed To </p>
                  <p className='text-xs md:text-base'> {customer} </p>
                  <p className='text-xs md:text-base'> {email} </p>
                  <p className='text-xs md:text-base'> {phone} </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-xs md:text-sm  text-gray-400"> Invoice Number </p>
                    <p className='text-xs md:text-base'> {orderId} </p>
                  </div>
                  <div>
                    <p className="font-medium text-xs md:text-sm  text-gray-400"> Invoice Date </p>
                    <p className='text-xs md:text-base'> {createdAt} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-9 border-b border-gray-200">
            <p className="font-medium text-xs md:text-sm  text-gray-400"> Note </p>
            <p className="text-xs md:text-sm "> Thank you for your order. Please, save this invoice to track process of your order!</p>
          </div>
          <table className="w-full divide-y divide-gray-200 text-xs md:text-sm ">
            <thead>
              <tr>
                <th scope="col" className="px-9 py-4 text-left font-semibold text-gray-400"> Price </th>
                <th scope="col" className="px-9 py-4 text-left font-semibold text-gray-400"> Item </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product: CartItem) => (
                <tr key={product.item?._id}>
                  <td className="px-9 py-5 whitespace-nowrap space-x-1 text-center"> ${product.item?.price ? +product.item.price * product.qty : null} </td>
                  <td className="px-9 py-5 whitespace-pre-line space-x-1 flex items-center">
                    <div>
                      <p className="text-sm text-left max-w-full"> {product.item?.title} </p>
                      <p className="text-xs md:text-sm text-gray-400 text-left"> Quantity: {product.qty} </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-9 border-b border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm"> Subtotal </p>
                </div>
                <p className="text-gray-500 text-xs md:text-sm"> ${productsPrice} </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm"> Shipping </p>
                </div>
                <p className="text-gray-500 text-xs md:text-sm"> $ {totalPrice - productsPrice} </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm"> Total </p>
                </div>
                <p className="text-gray-500 text-xs md:text-sm"> ${totalPrice} </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
