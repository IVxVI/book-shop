import toast from "react-hot-toast";
import { productsApi } from "./axiosApi";
import { Order } from "@/types/Order";

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

export const fetchOrders = async () => {
  try {
    const response = await productsApi.get('/api/orders');
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while loading orders!')
  }
}

export const fetchOrder = async (id: string) => {
  try {
    const response = await productsApi.get(`/api/orders/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while loading this order!')
  }
}

export const deleteOrder = async (id: string) => {
  try {
    const response = await productsApi.delete(`/api/orders?id=${id}`);

    if(response.status === 201) {
      toast.success('Order deleted successfully')
    }

    return response;
  } catch (error) {
    console.error(error);
    toast.error('Error while deleting order!')
  }
}