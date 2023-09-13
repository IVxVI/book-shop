import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  item: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      ref: 'Product'
    },
  },

  qty: {
    type: Number,
    required: true,
  },
},
  {
    collection: 'orders'
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
