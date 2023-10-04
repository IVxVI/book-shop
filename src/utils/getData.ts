import { Product } from "@/types/Product";
import toast from "react-hot-toast";

export const getData = async (params?: string) => {
  const res = await fetch(process.env.API_URL + '/api/products', {cache: 'no-cache'});

  if(!res.ok) {
    toast.error('Error with products loading!')
  }
  
  let data = await res.json();

  if(params) {
    data = data.filter((dataItem: Product) => dataItem.category === params)
  }

  return {
    props: { products: data }
  }
}