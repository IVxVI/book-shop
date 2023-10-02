import Link from 'next/link'

export default function AboutUs() {
  return (
        <div className="z-10 relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-6 lg:py-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to Adiutrix
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              At Adiutrix, we are passionate about books and dedicated to sharing the joy of reading with our community. 
              Our extensive collection includes a wide range of genres, from classics to contemporary bestsellers. Whether you&apos;re an avid reader or just starting your reading journey, we have something for everyone.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/products"
                  className="rounded-md bg-gray-900 hover:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </Link>
                <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}
