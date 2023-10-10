'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import classNames from 'classnames';
import { useCartContext } from '@/context/CartContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCartContext();
  const { data: session } = useSession();
  const pathname = usePathname();
  const cartItems = cart.reduce((prev, current) => current.qty + prev, 0)
  console.log(cartItems)
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/products' },
    { name: 'About us', href: '/about-us' },
    { name: 'Contact us', href: '/contact-us' },
    { name: 'Cart', href: '/cart' },
    { name: 'Admin', href: '/dashboard' }
  ]


  return (
    <header className="relative inset-x-0 top-0 z-20">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link key={link.name} href={link.href} className={classNames(
                "text-sm font-semibold leading-6 text-gray-400 hover:text-gray-700",
                {'text-gray-900': isActive}
              )}>
                {link.name}
              </Link>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-8">
          {
            !!cartItems && (
                <Link href="/cart" className='text-gray-700 mr-5'>
                  <button className="absolute">
                    <ShoppingCartIcon className='h-6' />
                    <span className="absolute inset-0 object-right-top -mr-10">
                      <div className="inline-flex items-center justify-center h-6 w-6 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-slate-600 text-white">
                        {cartItems}
                      </div>
                    </span>
                  </button>
                </Link>
            )
          }
          

          {!session?.user?.name ? (
            <Link href="/login" className="z-10 text-sm font-semibold leading-6 text-gray-400 hover:text-gray-700">
              <span aria-hidden="true">&rarr;</span> Log in 
            </Link>
            ) : (
              <button onClick={() => signOut()} className="z-10 text-sm font-semibold leading-6 text-gray-400 hover:text-gray-700">
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50">
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {!session?.user?.name ? (
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-100"
                    >
                      Log in
                    </Link>
                    ) : (
                    <Link href={'/'} onClick={() => signOut()} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-100">
                      Log out
                    </Link>
                    )
                  }
                </div>
                <div className="space-y-2 py-6">
                  
                </div>
              </div>
            </div>
          </Dialog.Panel>
          </div>
      </Dialog>
    </header>
  )
}
