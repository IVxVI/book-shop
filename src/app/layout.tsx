'use client'

import { Inter } from 'next/font/google'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { NavLink } from '../components/NavLink'
import { BuildingLibraryIcon } from '@heroicons/react/24/solid'
import { signOut } from 'next-auth/react'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { ProductProvider } from '@/context/ProductContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Link from 'next/link'
import Provider from '@/context/Provider'
import ToasterContext from '@/context/ToastContext'
import classNames from 'classnames'
import User from '../components/User'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { OrderProvider, useOrderContext } from '@/context/OrderContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Our products', href: '/products' },
    { name: 'About us', href: '/about-us' },
    { name: 'Cart', href: '/cart' },
  ] 

  const userNavigation = [
    { name: 'Your Profile', href: '#', onClick: () => {} },
    { name: 'Settings', href: '#', onClick: () => {} },
    { name: 'Sign out', href: '#', onClick: () => { signOut() }  },
  ]

  return (
    <html lang="en" className='h-full bg-gray-100'>
      <body className={classNames('h-full', inter.className)}>
        <Provider>
          <ToasterContext />
          <main className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center">
                        <BuildingLibraryIcon className='h-8 fill-white'/>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <NavLink
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <UserCircleIcon className="h-8 w-8 rounded-full fill-slate-400" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                        onClick={item.onClick}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          // as="a"
                          className={classNames(
                            'block rounded-md px-3 py-2'
                          )}
                        >
                          <NavLink 
                            href={item.href} 
                            className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                          >
                            {item.name}
                          </NavLink>
                        </Disclosure.Button>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <UserCircleIcon className="h-10 w-10 rounded-full fill-slate-400" />
                        </div>
                        <User />
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            onClick={item.onClick}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  <BuildingLibraryIcon className='h-12'/>
                  Adiutrix
                </h1>
              </div>
            </header> */}

            <article className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <ProductProvider>
                <CartProvider>
                  <OrderProvider>
                    <QueryClientProvider client={queryClient}>
                      {children}
                    </QueryClientProvider>
                  </OrderProvider>
                </CartProvider>
              </ProductProvider>
            </article>
          </main>
        </Provider>  
      </body>
    </html>
  )
}
