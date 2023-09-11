import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ZIP: {
    type: String,
    required: true,
  },

  
},
  {
    collection: 'orders'
  }
);

const Address = mongoose.model("address", addressSchema);

export default Address;