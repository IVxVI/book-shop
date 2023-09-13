import { placeOrder } from '@/utils/axiosApi';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export const Checkout = ({ order, setOrder }) => {
  const shippingOptions = [
    {name: 'Nova post', price: 120.00, terms: '1-3 working days'},
    {name: 'Ukrpost', price: 100.00, terms: '3-5 working days'},
    {name: 'Courier', price: 220.00, terms: '1-2 working days'},
  ];

  const [orderData, setOrderData] = useState({
    resolved: false,
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
    shipping: shippingOptions[0].name,
    products: order
  });
  const router = useRouter();

  const selectedShippingOption = shippingOptions.find(option => option.name === orderData.shipping);

  const handleChange = (event) => {
    if(event.target.name === 'street' || event.target.name === 'city' || event.target.name === 'ZIP') {
      const {name, value} = event.target;
      const addressField = name;

      setOrderData({
        ...orderData,
        address: {
          ...orderData.address,
          [addressField]: value,
        },
      });
    }
    else {
      setOrderData({...orderData, [event.target.name] : event.target.value})
    }
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    placeOrder(orderData);
    setOrder([]);

    router.push('/products');
  }

  return (
    <section className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {orderData.products.map(orderItem => (
            <div key={orderItem.item?._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={orderItem.item?.imgUrl} alt={orderItem.item?.title} />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{orderItem.item?.title}</span>
                <span className="float-right text-gray-400">Quantity: {orderItem.qty}</span>
                <p className="text-lg font-bold">$ {+orderItem.item?.price * orderItem.qty}</p>
              </div>
              <button onClick={() => handleDelete(orderItem.item?._id)} className="mb-2 text-red-600 hover:text-red-800">Delete</button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
        <form className="mt-5 grid gap-6">
          <div className="relative">
            {shippingOptions.map(option => (
              <div key={option.name} className="relative">
                <input 
                  required
                  value={option.name}
                  className="peer hidden"
                  id={`radio_${option.name}`}
                  type="radio"
                  name="shipping"
                  checked={orderData.shipping === option.name}
                  onChange={handleChange} 
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor={`radio_${option.name}`}
                >
                  <img className="w-14 object-contain" src='https://novaposhta.ua/runtime/cache/320x95/NP_Smilyvist_291_45.png' alt={option.name} />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">{option.name}</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: {option.terms}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Order Details</p>
        <p className="text-gray-400">Complete your order by providing your order details.</p>
        <div className="relative">
          <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
          <div className="relative">
            <input required onChange={handleChange} type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          <label htmlFor="customer" className="mt-4 mb-2 block text-sm font-medium">Customer</label>
          <div className="relative">
            <input required onChange={handleChange} type="text" id="customer" name="customer" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
          </div>

          <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Your contact phone number</label>
          <div className="relative">
            <input required onChange={handleChange} type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+380XXXXXXXXX" required />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
          </div>

          <label htmlFor="street" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
          <div className="flex flex-col sm:flex-row">
            
            <div className="relative w-full flex-shrink-0 sm:w-7/12">
              <label htmlFor="street"></label>
              <input required onChange={handleChange} type="text" id="street" name="street" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" required />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/abbc364f96859becf24ebdf7cf00d29d.svg" alt="flag" />
              </div>
            </div>
            
            <label htmlFor="city"></label>
            <input required onChange={handleChange} type="text" id="city" name="city" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="City" required />
            
            <label htmlFor="zip"></label>
            <input required onChange={handleChange} type="text" id="ZIP" name="ZIP" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" required />
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
        </div>
        <button onClick={handleSubmit} className="mt-4 mb-8 w-full rounded-md bg-gray-900 hover:bg-gray-600 px-6 py-3 font-medium text-white">Place Order</button>
      </div>
    </section>
  )
}
