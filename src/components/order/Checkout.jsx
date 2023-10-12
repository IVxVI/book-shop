import React, { useState, useEffect } from 'react'
import { placeOrder } from '@/utils/ordersApi';
import { OrderInvoice } from './OrderInvoice';
import { Form, Formik } from 'formik';
import { shippingOptions } from '@/utils/shippingOptions';
import * as Yup from 'yup';
import ModalWindow from '../sections/ModalWindow';
import FormField from '../sections/FormField';
import ShippingOptions from '../sections/ShippingOptions';
import generateOrderID from '@/utils/generateRandomId';
import FormButton from '../sections/FormButton';
import ErrorText from './ErrorText';
import AddressInputs from '../sections/AddressInputs';

export const Checkout = ({ order, setOrder }) => {
  const [ open, setOpen ] = useState(false);  

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

              if(response.status === 200) {
                setOpen(true);
          
                setOrder([])
              }
            } catch(error) {
              console.log(error)
            }
          }
        }
        >
          {({ handleChange, errors, touched, isSubmitting, isValid }) => (
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
                    handleChange={handleChange}
                  />
                    {errors.customer && touched.customer ? (
                      <ErrorText>
                        {errors.customer}
                      </ErrorText>
                    ) : null}  
                </div>
                <div className="relative">
                  <FormField
                    label="Email"
                    id="email"
                    type="text"
                    name="email"
                    handleChange={handleChange}
                  />
                    {errors.email && touched.email ? (
                      <ErrorText>
                        {errors.email}
                      </ErrorText>
                    ) : null}
                </div>
                <div className="relative">
                  <FormField
                    label="Phone"
                    id="phone"
                    type="tel"
                    name="phone"
                    handleChange={handleChange}
                  />
                    {errors.phone && touched.phone ? (
                      <ErrorText>
                        {errors.phone}
                      </ErrorText>
                    ) : null}
                </div>
              </div>
              <AddressInputs 
                handleChange={handleChange}
              />
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

              <FormButton 
                text="Place order"
                data={orderData.products}
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </Form>
          )}
        </Formik>
      </section>
      
      {open && (
        <ModalWindow
          open={open}
          setOpen={setOpen}
        >
          <OrderInvoice orderData={orderData} />
        </ModalWindow>
      )}
    </>
  )
}