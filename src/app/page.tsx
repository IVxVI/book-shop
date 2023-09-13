'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/axiosApi";
import ImageGrid from "@/components/ImageGrid";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [productsData, setProductsData] = useState([]);

  const { data, isError } = useQuery({
    queryKey: ['books'],
    queryFn: fetchProducts,
    onSuccess(data) {
      setProductsData(data)
    },
  });

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Explore Our Book Collection
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              <span>Discover a world of knowledge and adventure in our carefully curated collection of books</span>
            </p>
          </div>
          <div>
            <div className="mt-10">
              <ImageGrid 
                productsData={productsData}
              />
              <Link
                href="/products"
                className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
              >
                Explore Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
