import mongoose, { Schema } from "mongoose";
import Address from "./address";
import CartItem from "./cartItem";

const orderSchema = new Schema({
  resolved: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  customer: {
    type: String,
    required: false,
  },
  address: {
    type: Address.schema,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  productsPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: {
    type: [CartItem.schema],
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;