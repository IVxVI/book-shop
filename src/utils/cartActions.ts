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

export const handleCheckout = (order: CartItem[], setOrder: any, cart: CartItem[], setCart: any, router: any) => {
  if(order.length > 0) {
    const newOrder = [...order];

    cart.forEach((cartItem: CartItem) => {
      const existingOrderItemIndex = newOrder.findIndex(orderItem => orderItem.item?._id === cartItem.item?._id);

      if (existingOrderItemIndex !== -1) {
        newOrder[existingOrderItemIndex] = {
          ...newOrder[existingOrderItemIndex],
          qty: newOrder[existingOrderItemIndex].qty + cartItem.qty
        };
      } else {
        newOrder.push(cartItem);
      }
    });

    setOrder(newOrder)
  } else {
    setOrder(cart);
  }

  router.push('/order');
  
  setTimeout(() => {
    setCart([]);
  }, 2000);
}

export const handleDeleteFromCart = (productId: string, cart: CartItem[], setCart: any) => {
  setCart(cart.filter((cartItem: CartItem) => cartItem.item?._id !== productId))
}

export const handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>, productId: string, cart: CartItem[], setCart: any) => {
  setCart(
    cart.map((cartItem: CartItem) =>
      cartItem.item._id === productId
        ? { ...cartItem, qty: +event.target.value }
        : cartItem
    )
  );
}

export const handleAddQty = (productId: string, cart: CartItem[], setCart: any) => {
  setCart(
    cart.map((cartItem: CartItem) =>
      cartItem.item._id === productId && cartItem.qty !== 99
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    )
  );
}

export const handleSubstractQty = (productId: string, cart: CartItem[], setCart: any) => {
  setCart(
    cart.map((cartItem: CartItem) =>
      cartItem.item._id === productId && cartItem.qty !== 1
        ? { ...cartItem, qty: cartItem.qty - 1 }
        : cartItem
    )
  );
}