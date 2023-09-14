import { Inter } from 'next/font/google'
import classNames from 'classnames'
import ProvidersLayout from '@/components/ProvidersLayout'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book-shop',
  description: 'Book shop for you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-gray-100'>
      <body className={classNames('h-full', inter.className)}>
        <ProvidersLayout>
          {children}  
        </ProvidersLayout>
      </body>
    </html>
  )
}
