import { CartItem } from "./CartItem"

export type Order = {
  _id?: string,
  resolved: boolean,
  createdAt: string,
  phone: string,
  email: string,
  customer: string,
  address: {
    street: string,
    city: string,
    ZIP: string
  },
  shipping: string,
  productsPrice: number,
  totalPrice: number,
  products: CartItem[]
}