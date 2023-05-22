
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/libs/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import {Session , Account, SessionStrategy } from 'next-auth';
import { JWT } from "next-auth/jwt";

export  const authOptions = {
    providers: [
        
        // OAuth authentication providers...
        GoogleProvider({
          clientId: "758472497071-hkdv1q0hnq7jtuml5fkvkan61ujek9ug.apps.googleusercontent.com",
          clientSecret: "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",
        }),
    
      ],

      session: {
        strategy: 'jwt' as SessionStrategy,
      },
        pages:{
          signIn:"/"
        }
      ,

      callbacks: {
        session: async({token,session}:{token:JWT,session:Session})=> {
          
          if(session?.user && token?.sub){
           session.user.id = token.sub;
          }

          return session;
       }
  },
  secret:process.env.NEXTAUTH,
      
      adapter: MongoDBAdapter(clientPromise),
      
}