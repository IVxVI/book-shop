import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";
import Order from "@/models/order";

export async function GET (request: NextRequest, { params }: any) {
  await connectMongoDB();
  const { id } = params;
  const orderData = await Order.findOne({ _id: id });

  return new Response(JSON.stringify(orderData), { status: 200 });
}