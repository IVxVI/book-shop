import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/order";

export async function POST (request: NextRequest) {
  await connectMongoDB();

  const {
    resolved,
    phone,
    email,
    customer,
    address,
    shipping,
    productsPrice,
    totalPrice,
    products 
  } = await request.json();

  await Order.create({
    resolved,
    phone,
    email,
    customer,
    address,
    productsPrice,
    totalPrice,
    shipping,
    products
  });

  // return NextResponse.json({message: 'Order placed'}, { status: 200 });
  return new Response(JSON.stringify(Order), {status: 200});
}

export async function GET () {
  await connectMongoDB();
  const allOrders = await Order.find();
    
  return new Response(JSON.stringify(allOrders), {status: 200});
}
