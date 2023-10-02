import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import ContactRequest from "@/models/contact-request";

export async function GET () {
  await connectMongoDB();
  const allRequests = await ContactRequest.find({});

  return NextResponse.json(allRequests);
}

export async function POST (request: NextRequest) {
  await connectMongoDB();

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    message,

    createdAt,
    resolved
  } = await request.json();

  const newRequest = await ContactRequest.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    message,

    createdAt,
    resolved
  });

  return new Response(JSON.stringify(newRequest), {status: 200});
}