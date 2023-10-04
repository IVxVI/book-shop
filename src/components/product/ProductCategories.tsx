import Link from 'next/link'
import React from 'react'

export default function ProductCategories() {
  const callouts = [
    {
      name: 'Books & Comics',
      description: 'Explore our wide range of books and comics for all ages and interests.',
      imageSrc: 'https://media.istockphoto.com/id/1227235401/photo/stack-of-books-on-table-in-the-room.webp?b=1&s=170667a&w=0&k=20&c=zB6q7tDiSbE0nQb1UrvY26BEc_x-tvb4LF_5gjfYBiA=',
      imageAlt: 'Stack of books and comics on a wooden table.',
      href: '/products/books-comics',
    },
    {
      name: 'Office Supplies',
      description: 'Upgrade your workspace with our selection of office supplies and accessories.',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
      imageAlt: 'Desk with office supplies including pens, notebooks, and a laptop.',
      href: '/products/office-supplies',
    },
    {
      name: 'Other',
      description: 'Discover unique and miscellaneous items you won\'t find anywhere else.',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
      imageAlt: 'Assorted miscellaneous items on a display shelf.',
      href: '/products/others',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {callouts.map((callout) => (
            <div key={callout.name} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={callout.imageSrc}
                  alt={callout.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <Link href={callout.href}>
                  <span className="absolute inset-0" />
                  {callout.name}
                </Link>
              </h3>
              <p className="text-base font-semibold text-gray-900">{callout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
