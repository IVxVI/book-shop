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
    if(response.statusText === 'OK') {
      toast.success(`Successfully added product ${productData.title}`)
      return response;
    } else {
      toast.error('Error while adding product!')
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while adding product!')
  }
}

export const editProduct = async (productData: Product) => {
  try {
    const response = await productsApi.put(`/api/products/${productData._id}`, productData);
    if(response.statusText === 'OK') {
      toast.success(`Successfully edited product ${productData.title}`)
      return response;
    } else {
      toast.error('Error while editing product!')
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while editing product!')
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const response = await productsApi.delete(`/api/products?id=${productId}`);
    if(response.statusText === 'OK') {
      toast.success(`Successfully deleted product ${productId}`)
      return response;
    } else {
      toast.error('Error while editing product!')
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while deleting product!')
  }
} 