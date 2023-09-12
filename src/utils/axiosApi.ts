import axios from "axios";
import toast from 'react-hot-toast';
import { Product } from '../types/Product';
import { Order } from "@/types/Order";

const productsApi = axios.create({
  baseURL: process.env.API_URL,
})

export const fetchProducts = async () => {
  try {
    const { data } = await productsApi.get('/api/products');
    return data;
  } catch (error) {
    console.error(error);
    toast.error('Error while loading products!')
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const response = await productsApi.get(`/api/products/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while loading product!')
  }
};

export const addProduct = async (productData: Product) => {
  try {
    const response = await productsApi.post('/api/products', productData);
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while adding product!')
  }
}

export const editProduct = async (productData: Product) => {
  try {
    const response = await productsApi.put(`/api/products/${productData._id}`, productData);
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while editing product!')
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const response = await productsApi.delete(`/api/products?id=${productId}`);
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while deleting product!')
  }
} 

export const placeOrder = async (orderData: Order) => {
  try {
    const response = await productsApi.post('/api/orders', orderData);
    if(response.status === 200) {
      toast.success('Order placed successfully!');
    }
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while placing order!')
  }
}