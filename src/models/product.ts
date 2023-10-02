import mongoose, { models, Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  
  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  imgUrl: {
    type: String,
    required: true
  },
  
  author: {
    type: String,
    required: true
  },

  pagesQty: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },
});

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;