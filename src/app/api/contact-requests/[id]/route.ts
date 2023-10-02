import { connectMongoDB } from "@/lib/mongodb";
import ContactRequest from "@/models/contact-request";

export async function GET (request: Request, { params }: any) {
  await connectMongoDB();
  const { id } = params;
  const requestData = await ContactRequest.findOne({ _id: id });

  return new Response(JSON.stringify(requestData), { status: 200 });
}