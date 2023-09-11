import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { CartItem } from "@/types/CartItem";
import { useLocalStorage } from "@/utils/UseLocalStorage";

type OrderContextType = {
  order: CartItem[],
  setOrder: Dispatch<SetStateAction<CartItem[]>>,
}

const defaultOrderContext: OrderContextType = {
  order: [],
  setOrder: () => {}
};

export const OrderContext = createContext(defaultOrderContext);

export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useLocalStorage('order', []);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrderContext() {
  return useContext(OrderContext);
}