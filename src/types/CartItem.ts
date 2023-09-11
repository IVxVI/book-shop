import { Product } from "./Product"

export type CartItem = {
    item: Product | undefined,
    qty: number
}