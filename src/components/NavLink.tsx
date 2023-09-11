'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string, 
  exact?: string,
  children: React.ReactNode
  className: any,
}

export const NavLink: React.FC<Props> = ({ href, exact, children, ...props }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const baseClassName =  'rounded-md px-3 py-2 text-sm font-medium ';

  if (isActive) {
    props.className = baseClassName + 'bg-gray-900 text-white';
  } else {
    props.className = baseClassName + 'text-gray-300 hover:bg-gray-700 hover:text-white'
  };

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}