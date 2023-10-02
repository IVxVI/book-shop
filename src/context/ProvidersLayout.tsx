'use client'

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import Provider from "@/context/Provider";
import ToasterContext from "@/context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/sections/Header";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();

  return (
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
  )
}
