import { Roboto } from 'next/font/google'
import classNames from 'classnames'
import ProvidersLayout from '@/context/ProvidersLayout'
import Wrapper from '@/components/sections/AsideBg'
import type { Metadata } from 'next'
import './globals.css'

const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book-shop',
  description: 'Book shop for you',
  icons: {
    icon: ['/favicon.ico?v=4']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-gray-50'>
      <body className={classNames('h-full', roboto.className)}>
        <Wrapper>
          <ProvidersLayout>
            {children}
          </ProvidersLayout>
        </Wrapper>
      </body>
    </html>
  )
}
