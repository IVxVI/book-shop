import toast from "react-hot-toast";
import { productsApi } from "./axiosApi";
import { Product } from "@/types/Product";

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