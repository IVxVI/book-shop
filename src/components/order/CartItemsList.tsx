import React from 'react'
import { CartItem as CartItemType } from '@/types/CartItem';
import { handleAddQty, handleDeleteFromCart, handleQtyChange, handleSubstractQty } from '@/utils/cartActions';
import CartItem from './CartItem';

type Props = {
  cart: CartItemType[],
  setCart: any,
  extended: boolean
}

export default function CartItemsList({ cart, setCart, extended }: Props) {

  const handleRemove = (productId: string) => {
    handleDeleteFromCart(productId, cart, setCart)
  }

  const handleQty = (event: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    handleQtyChange(event, productId, cart, setCart);
  }

  const handleAdd = (productId: string) => {
    handleAddQty(productId, cart, setCart);
  }
  
  const handleSubstract = (productId: string) => {
    handleSubstractQty(productId, cart, setCart);
  }

  const actions = {handleRemove, handleQty, handleAdd, handleSubstract}

  return (
    extended 
      ? cart.map((cartItem: CartItemType) => <CartItem key={cartItem.item._id} cartItem={cartItem} {...actions} extended={extended} />)
      : 
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.map((cartItem: CartItemType) => <CartItem key={cartItem.item._id} cartItem={cartItem} {...actions} extended={extended} />)}
        </ul>
      )
}
