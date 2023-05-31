
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/libs/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { Session, Account, SessionStrategy } from 'next-auth';
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from './mongoose';
import { UserModel } from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "758472497071-hkdv1q0hnq7jtuml5fkvkan61ujek9ug.apps.googleusercontent.com",
      clientSecret: "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",
    }),


    // CUSTOM AUTHENTICATION WITH EAMIL AND PASSWORD!
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      
      async authorize(credentials) {
        await mongooseConnect();

        // GETTING USER WITH EMAIL
        const user = await UserModel.findOne({
          email: credentials?.email,
        });

        // EMAIL NOT EXISTS!
        if (!user) {
          throw new Error("Email is not registered");
          return null;
        }

        // VERIFYING PASSWORD!
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.encryptedPassword
        );

        // PASSWORD INCORRECT
        if (!isPasswordCorrect) {
          throw new Error("Incorect Password");
          return;
        }

        return user;
      },
    })

  ],

  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: "/"
  }
  ,

  callbacks: {
    session: async ({ token, session }: { token: JWT, session: Session }) => {

      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH,

  adapter: MongoDBAdapter(clientPromise),

}