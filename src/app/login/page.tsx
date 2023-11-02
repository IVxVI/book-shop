'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const session = useSession();

  const router = useRouter();
  
  useEffect(() => {
    if(session.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session.status, router])

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({...credentials, [event.target.name] : event.target.value})
  }

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    signIn('credentials', {...credentials, redirect: false})
      .then((callback) => {
        if(callback?.error) {
          toast.error(callback.error);
        }

        if(callback?.ok && !callback?.error) {
          toast.success('Logged in successfully')
          router.push('/dashboard')
        }
      })
  }

  const googleAuth = async (event: React.FormEvent) => {
    event.preventDefault();

    signIn('google')
      .then((callback) => {
        if(callback?.error) {
          toast.error(callback.error);
        }

        if(callback?.ok && !callback?.error) {
          toast.success('Logged in successfully')
          router.push('/dashboard')
        }
      })
  }

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Sign in to your an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChanges}
                  required
                  className="p-2.5 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/contact-us" className="font-semibold text-gray-600 hover:text-gray-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChanges}
                  required
                  className="p-2.5 block w-full rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div className="text-sm">
                <Link href="/register" className="font-semibold text-gray-600 hover:text-gray-500">
                  Don`t have an account? Sign up!
                </Link>
                </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>

              <div className="flex justify-center items-center gap-3">
                <button onClick={googleAuth} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2">
                  <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}
