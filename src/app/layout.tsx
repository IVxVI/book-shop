'use client'

import { Inter } from 'next/font/google'
import { ProductProvider } from '@/context/ProductContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from '@/context/CartContext'
import { OrderProvider } from '@/context/OrderContext'
import Provider from '@/context/Provider'
import ToasterContext from '@/context/ToastContext'
import classNames from 'classnames'
import Header from '@/components/Header'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book-shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className='h-full bg-gray-100'>
      <body className={classNames('h-full', inter.className)}>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <ToasterContext />
              <main className="min-h-full">
                <Header />
                <article className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                  <ProductProvider>
                    <CartProvider>
                      <OrderProvider>
                          {children}
                      </OrderProvider>
                    </CartProvider>
                  </ProductProvider>
                </article>
              </main>
          </QueryClientProvider>
        </Provider>  
      </body>
    </html>
  )
}
