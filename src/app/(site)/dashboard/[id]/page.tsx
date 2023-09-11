import { EditProductForm } from '@/components/EditProductForm';
import { fetchProduct } from '@/utils/axiosApi';

export default async function EditProductPage({ params }) {
  const { id } = params;

  const { data } = await fetchProduct(id);
  
  return (
    data && <EditProductForm product={data.product}/>
  )
}
