import toast from "react-hot-toast";
import { productsApi } from "./axiosApi";
import { ContactRequest } from "@/types/ContactRequest";

export const fetchContactRequests = async () => {
  try {
    const { data, status } = await productsApi.get('/api/contact-requests');
    if(status === 200) {
      toast.success('Contact requests successfully loaded!')
      return data;
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while loading contact requests!')
  }
}

export const postContactRequst = async (requestData: ContactRequest) => {
  try {
    const { data, status } = await productsApi.post('/api/contact-requests', requestData);
    if(status === 200) {
      toast.success('Contact request successfully sent!')
      return data;
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while sending contact request!')
  }
}

export const fetchContactRequest = async (id: string) => {
  try {
    const { data, status } = await productsApi.get(`/api/contact-requests/${id}`);
    if(status === 200) {
      toast.success('Contact request successfully loaded!')
      return data;
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while loading products!')
  }
}