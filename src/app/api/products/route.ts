import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";

export async function POST (request: NextRequest) {
  await connectMongoDB();
  const {title, price, description, imgUrl} = await request.json();

  await Product.create({title, price, description, imgUrl});
  return NextResponse.json({message: 'Product created'}, { status: 201 });
}

export async function GET () {
  await connectMongoDB();
  const allProducts = await Product.find();
    
  return new Response(JSON.stringify(allProducts))
}

export async function DELETE (request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({message: 'Product deleted'}, { status: 201 });
}