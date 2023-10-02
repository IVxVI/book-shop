import { NextRequest } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";

export async function POST (request: NextRequest) {
  await connectMongoDB();
  const {title, price, description, imgUrl, author, pagesQty, language, category} = await request.json();

  const newProduct = await Product.create({title, price, description, imgUrl, author, pagesQty, language, category});
  return new Response(JSON.stringify(newProduct), { status: 201 });
}

export async function GET () {
  await connectMongoDB();
  const allProducts = await Product.find();
    
  return new Response(JSON.stringify(allProducts), { status: 200 })
}

export async function DELETE (request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  const deletedProduct = await Product.findByIdAndDelete(id);

  return new Response(JSON.stringify(deletedProduct), { status: 201 });
}