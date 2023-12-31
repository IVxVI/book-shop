'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productsApi";
import ImageGrid from "@/components/sections/ImageGrid";
import Link from "next/link";
import Loader from "@/components/sections/Loader";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchProducts,
  });

  return (
    <section className="relative overflow-ellipsis">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-36">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Explore Our Book Collection
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              <span>Discover a world of knowledge and adventure in our carefully curated collection of books</span>
            </p>
          </div>
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl lg:h-[28rem]"
            >
              {isLoading ? 
                <div className="absolute inset-0 lg:translate-x-64 lg:translate-y-0 sm:translate-y-48 translate-y-64">
                  <Loader />
                </div> : 
                <ImageGrid productsData={data} />}
            </div>
            <Link
              href="/products"
              className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
              aria-disabled={isLoading}
            >
              Explore Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
