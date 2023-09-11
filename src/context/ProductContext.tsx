import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Product } from "../types/Product";

const defaultProductContext: ProductContextType = {
  products: [],
  setProducts: () => {},
};

type ProductContextType = {
  products: Product[],
  setProducts: Dispatch<SetStateAction<Product[]>>,
}

export const ProductContext = createContext(defaultProductContext);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};