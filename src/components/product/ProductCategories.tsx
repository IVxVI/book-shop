import Link from 'next/link'
import React from 'react'

export default function ProductCategories() {
  const calloutsData = [
    {
      name: 'Books & Comics',
      description: 'Explore our wide range of books and comics for all ages and interests.',
      imageSrc: 'https://images.unsplash.com/photo-1556566952-11eff3d06ed4?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    {
      name: 'Everything here',
      description: 'Don`t know rhat you`re looking for? Everything you might be interested in is here!',
      imageSrc: 'https://images.unsplash.com/photo-1529473814998-077b4fec6770?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Assorted miscellaneous items on a display shelf.',
      href: '/products/everything',
    },
  ]

  const callouts = [calloutsData[1], calloutsData[2]]

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-2 lg:max-w-none">
        <div className="mt-6 lg:grid grid-cols-3 gap-4">
          <div key={calloutsData[3].name} className="col-span-2 group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <img
                src={calloutsData[3].imageSrc}
                alt={calloutsData[3].imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
              <Link href={calloutsData[3].href}>
                <span className="absolute inset-0" />
                {calloutsData[3].name}
              </Link>
            </h3>
            <p className="text-base font-semibold text-gray-900">{calloutsData[3].description}</p>
          </div>
          <div key={calloutsData[0].name} className="row-span-2 group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 lg:h-[86.6%]">
              <img
                src={calloutsData[0].imageSrc}
                alt={calloutsData[0].imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
              <Link href={calloutsData[3].href}>
                <span className="absolute inset-0" />
                {calloutsData[0].name}
              </Link>
            </h3>
            <p className="text-base font-semibold text-gray-900">{calloutsData[0].description}</p>
          </div>
          
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
            </div>)
          )}
            
        </div>
      </div>
    </section>
  )
}
