import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/order";

export async function GET () {
  await connectMongoDB();
  const allOrders = await Order.find({});

  return NextResponse.json(allOrders);
}

export async function POST (request: NextRequest) {
  await connectMongoDB();

  const {
    resolved,
    createdAt,
    orderId,
    phone,
    email,
    customer,
    address,
    shipping,
    productsPrice,
    totalPrice,
    products 
  } = await request.json();

  const newOrder = await Order.create({
    resolved,
    createdAt,
    orderId,
    phone,
    email,
    customer,
    address,
    productsPrice,
    totalPrice,
    shipping,
    products
  });

  return new Response(JSON.stringify(newOrder), {status: 200});
}

export async function DELETE (request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  const deletedOrder = await Order.findByIdAndDelete(id);

  return new Response(JSON.stringify(deletedOrder), { status: 201 });
}
