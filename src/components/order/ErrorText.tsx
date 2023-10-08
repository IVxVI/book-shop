import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function ErrorText({ children }: Props) {
  return (
    <p className='text-sm font-normal text-red-400'>{children}</p>
  )
}
