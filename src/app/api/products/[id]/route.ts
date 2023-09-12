import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/product';
import { NextRequest } from 'next/server';

export async function GET (request: NextRequest, { params }: any) {
  await connectMongoDB();
  const { id } = params;
  const product = await Product.findOne({ _id: id });

  return new Response(JSON.stringify(product), { status: 200 });
}

export async function PUT (request: Request, { params }: any) {
  const { id } = params;
  const productData = await request.json();  
  await connectMongoDB();

  try {
    const editedProduct = await Product.findByIdAndUpdate(id, {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      imgUrl: productData.imgUrl,
    });

    return new Response(JSON.stringify(editedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}



