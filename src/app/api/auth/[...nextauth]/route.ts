import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Adapter } from 'next-auth/adapters';

//random secret code generation: openssl rand -base64 32 in terminal

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),

    CredentialsProvider({
      name: "credentials",
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text" }
      },

      async authorize(credentials) {
        if(!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        
        if(!user || !user?.hashedPassword) {
          throw new Error('No user found!')
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if(!passwordMatch) {
          throw new Error('Incorrect password!')
        }

        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login'
  },

  // debugger: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};