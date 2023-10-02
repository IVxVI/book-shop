import { CartItem } from "@/types/CartItem";
import { Product } from "@/types/Product";
import toast from "react-hot-toast";

export const addToCart = (product: Product, cart: CartItem[], setCart: any) => {
  if (product) {
    const existingCartItem = cart.find(
      cartItem => cartItem?.item?._id === product._id
    );

    if (existingCartItem) {
      setCart(
        cart.map(cartItem =>
          cartItem?.item?._id === product._id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        { item: product, qty: 1 },
      ]);
    }

    toast.success('Successfully added to cart!')
  }
}


