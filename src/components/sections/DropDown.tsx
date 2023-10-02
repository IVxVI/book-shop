import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'

export default function DropDown() {
  const menuItems = ['Delete', 'Edit', 'Details']
  return (
    <Menu as="div" className="absolute right-0 inline-block text-left">
      <div className='absolute -top-5 right-2'>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {/* Options */}
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map((menuItem: any) => (
              <Menu.Item key={menuItem}>
                {({ active }) => (
                  <p
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {menuItem}
                  </p>
                )}
              </Menu.Item>
            ))}
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
