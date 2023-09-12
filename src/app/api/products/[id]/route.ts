import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/product';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (request: NextRequest, { params }: any) {
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

    // return NextResponse.json({ message: 'Product updated' }, { status: 200 });
    return new Response(JSON.stringify(editedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}

export async function GET (request: NextRequest, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}


