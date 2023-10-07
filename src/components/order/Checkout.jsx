import React, { useState, useEffect } from 'react'
import { placeOrder } from '@/utils/ordersApi';
import { OrderInvoice } from './OrderInvoice';
import { Field, Form, Formik } from 'formik';
import ModalWindow from '../sections/ModalWindow';
import FormField from '../sections/FormField';
import ShippingOptions from '../sections/ShippingOptions';
import generateOrderID from '@/utils/generateRandomId';
import classNames from 'classnames';
import * as Yup from 'yup';

export const Checkout = ({ order, setOrder }) => {
  const [ open, setOpen ] = useState(false);  

  const shippingOptions = [
    {name: 'Nova post', price: 120.00, terms: '1-3 working days'},
    {name: 'Ukrpost', price: 100.00, terms: '3-5 working days'},
    {name: 'Courier', price: 220.00, terms: '1-2 working days'},
  ];

  const [orderData, setOrderData] = useState({
    resolved: false,
    createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    orderId: generateOrderID(),
    customer: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      ZIP: '',
    },
    productsPrice: 0,
    totalPrice: 0,
    shipping: shippingOptions[1].name,
    products: order
  });

  const selectedShippingOption = shippingOptions.find(option => option.name === orderData.shipping);

  const handleDelete = (productId) => {
    setOrder(order.filter(orderItem => orderItem.item?._id !== productId));
    setOrderData({...orderData, products: order.filter(orderItem => orderItem.item?._id !== productId)})
  }
  
  useEffect(() => {
    const totalPrice = orderData.products.map(
      orderItem => +orderItem.item?.price * orderItem.qty).reduce(
        (acc, curr) => {
            return acc + curr;
          }, 0)

    setOrderData({
      ...orderData, 
      productsPrice: +totalPrice.toFixed(2), 
      totalPrice: +totalPrice.toFixed(2) + selectedShippingOption.price
    });
  }, [orderData.products, orderData.shipping]);

  const OrderSchema = Yup.object().shape({
    customer: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, { message: 'Please, keep up to the format +380XXXXXXXXX', excludeEmptyString: true }),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <>
      <section className="lg:grid grid-rows-1 grid-cols-1 gap-4 py-2 sm:px-10 lg:px-20 xl:px-32">
        <div className="col-span-2 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          {orderData.products.map(orderItem => (
            <div key={orderItem.item?._id} className="flex flex-row rounded-lg bg-white">
              <img className="m-2 h-full w-28 rounded-md border object-cover object-center" src={orderItem.item?.imgUrl} alt={orderItem.item?.title} />
              <div className="flex w-full flex-col px-4 py-2">
                <span className="font-semibold">{orderItem.item?.title}</span>
                <span className="float-right text-gray-400">Quantity: {orderItem.qty}</span>
                <p className="text-lg font-bold">$ {+orderItem.item?.price * orderItem.qty}</p>
              </div>
              <button onClick={() => handleDelete(orderItem.item?._id)} className="mb-2 text-red-600 hover:text-red-800">Delete</button>
            </div>
          ))}
        </div>

        <Formik
          initialValues={orderData} 
          validationSchema={OrderSchema}     
          onSubmit={async values => {
            try {
              setOrderData({
                ...values,
                productsPrice: orderData.productsPrice,
                totalPrice: orderData.totalPrice
              })
              const response = await placeOrder({
                ...values,
                productsPrice: orderData.productsPrice,
                totalPrice: orderData.totalPrice
              });

              if(response.statusText === 'OK') {
                setTimeout(() => {
                  setOpen(true)
                }, 1000)
          
                setTimeout(() => {
                  setOrder([])
                }, 4000);
              }
            } catch(error) {
              console.log(error)
            }
          }
        }
        >
          {(actions) => {
            return (
              <Form className="row-span-2 col-span-2 gap-6 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <p className="text-xl font-medium">Order Details</p>
                <p className="text-gray-400">Complete your order by providing your order details.</p>
                
                
                <div className="grid grid-cols-1 gap-x-8 gap-y-3">
                  <div className="relative">
                    <FormField
                      label="First name & Last name"
                      id="customer"
                      type="text"
                      name="customer"
                      handleChange={actions.handleChange}
                    />
                    {actions.errors.customer && actions.touched.customer ? (
                      <div>{actions.errors.customer}</div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <FormField
                      label="Email"
                      id="email"
                      type="text"
                      name="email"
                      handleChange={actions.handleChange}
                    />
                    {actions.errors.email && actions.touched.email ? (
                      <div>{actions.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <FormField
                      label="Phone"
                      id="phone"
                      type="tel"
                      name="phone"
                      handleChange={actions.handleChange}
                    />
                    {actions.errors.phone && actions.touched.phone ? (
                      <div>{actions.errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <label htmlFor="address.street" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full flex-shrink-0 sm:w-7/12">
                    <Field required onChange={actions.handleChange} type="text" id="address.street" name="address.street" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                    
                    
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/abbc364f96859becf24ebdf7cf00d29d.svg" alt="flag" />
                    </div>
                  </div>
                  
                  <label htmlFor="address.city"></label>
                  <Field required onChange={actions.handleChange} type="text" id="address.city" name="address.city" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="City" />
                  
                  <label htmlFor="address.zip"></label>
                  <Field required onChange={actions.handleChange} type="text" id="address.ZIP" name="address.ZIP" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
                </div>

                <div className='flex flex-col justify-center items-center max-w-full'>
                  <p className="my-4 text-lg self-start font-medium">Shipping Methods</p>
                  <ShippingOptions 
                    orderData={orderData}
                    setOrderData={setOrderData}
                    shippingOptions={shippingOptions}
                  />
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                    <p className="font-semibold text-gray-900">${orderData.productsPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="font-semibold text-gray-900">${selectedShippingOption.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">${orderData.totalPrice.toFixed(2)}</p>
                </div>

                <button 
                  type="submit"
                  disabled={actions.isSubmitting || orderData.products.length === 0}
                  className={classNames(
                    "mt-4 mb-8 w-full rounded-md hover:bg-gray-600 px-6 py-3 font-medium text-white",
                    {'bg-gray-600': actions.isSubmitting || orderData.products.length === 0},
                    {'bg-gray-900': orderData.products.length > 0},
                  )}>
                  {actions.isSubmitting ? 'Submitting...' : 'Place Order'}
                </button>
              </Form>
          )}}
        </Formik>
      </section>
      
      <ModalWindow
        open={open}
        setOpen={setOpen}
      >
        <OrderInvoice orderData={orderData} />
      </ModalWindow>
    </>
  )
}