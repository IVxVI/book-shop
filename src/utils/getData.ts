import toast from "react-hot-toast";

export const getData = async () => {
  const res = await fetch(process.env.API_URL + '/api/products', {cache: 'no-cache'});

  if(!res.ok) {
    toast.error('Error with products loading!')
  }
  
  const data = await res.json();

  return {
    props: { products: data }
  }
}