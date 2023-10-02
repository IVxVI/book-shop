'use client'
import { useSession } from 'next-auth/react'

export default function User() {
    const { data: session } = useSession();

    console.log(session?.user?.email)

    const user = {
      name: session?.user?.name,
      email: session?.user?.email,
    }

  return (
    <div className="ml-3">
      <div className="text-base font-medium leading-none text-white">{user.name}</div>
      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
    </div>
  )
}