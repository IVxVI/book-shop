'use client'

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import Provider from "@/context/Provider";
import ToasterContext from "@/context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/sections/Header";
import { useState } from "react";
import Sidebar from "@/components/sections/Sidebar";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();
  const [openSidebar, setOpenSidebar] = useState(false);


  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ToasterContext />
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <main className="min-h-full">
                  <Header setOpenSidebar={setOpenSidebar} />
                  <Sidebar 
                    title="Cart"
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                  />
                  <article className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                  </article>
                </main>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
      </QueryClientProvider>
    </Provider>
  )
}
