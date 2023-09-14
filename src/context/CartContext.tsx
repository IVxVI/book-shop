'use client'

import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { CartItem } from "@/types/CartItem";
import { useLocalStorage } from "@/utils/UseLocalStorage";

type CartContextType = {
  cart: CartItem[],
  setCart: Dispatch<SetStateAction<CartItem[]>>,
}

const defaultCartContext: CartContextType = {
  cart: [{
    item: undefined,
    qty: 0
  }],
  setCart: () => {}
};

export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useLocalStorage('cart', []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  return useContext(CartContext);
}