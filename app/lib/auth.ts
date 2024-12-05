
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
const client = new PrismaClient();
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: 'email', type: 'text', placeholder: '' },
              password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                const email  = credentials.username;
                const password = credentials.password
                console.log("here")
                try{
                    const res = await client.user.create({
                    data  :{
                        email : email,
                        password : password,
                    }
                })
                return {
                    id : res.id,
                    email : res.email,
                    password : res.password,
                };
                }catch(err){
                    console.log(err);
                    return null;
                }
                
            },
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          })
      ],
      
      secret : process.env.NEXT_AUTH_SECRET,
      callbacks : {
          session({ session, token}: any)  {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      },
      async signIn({user , account} : any){
        console.log("user details" ,user.email )
        console.log("user password", user.password)
        console.log("account details" ,account.provider )
        if(account.provider === "google"){
            const res = await client.user.create({
                data : {
                    email : user.email,
                    password : "oauth authentication"
                }
            })
            if(!res){
                console.log("data oauth failed ")
                return false;
            }
            console.log(res);
        }
        return true;

      }

      
    },
}