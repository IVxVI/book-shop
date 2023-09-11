import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST (request: NextRequest) {
   const data = await request.json();
   const { name, email, password } = data;
   
   if(!name || !email || !password) {
      return new NextResponse('Missing credentials!', { status: 400 })
   }

   const existingUser = await prisma.user.findUnique({
      where: {
         email: email,
      }
   })

   if(existingUser) {
      return new NextResponse('User already exists!', { status: 400 })
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await prisma.user.create({
      data: {
         name, 
         email, 
         hashedPassword,
      }
   });

   return NextResponse.json(user);
}