import mongoose, { Schema, models } from "mongoose";

const ContactRequestSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },

  resolved: {
    type: Boolean,
    required: true,
  },

  createdAt: {
    type: String,
    required: true
  }
});

const ContactRequest = models.ContactRequest || mongoose.model("ContactRequest", ContactRequestSchema);

export default ContactRequest;