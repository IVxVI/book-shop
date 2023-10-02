import axios from "axios";

export const productsApi = axios.create({
  baseURL: process.env.API_URL,
})
