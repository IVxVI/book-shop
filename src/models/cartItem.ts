import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  item: {
    type: new Schema({
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
      },
    }),
    required: true,
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
