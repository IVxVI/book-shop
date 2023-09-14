import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema({
  resolved: {
    type: Boolean,
    required: true,
  },

  createdAt: {
    type: String,
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
    type: Object,
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
  products: [{
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
  }],
});

const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;