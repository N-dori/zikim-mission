import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GooglePovider from 'next-auth/providers/google'
import bcrypt  from 'bcryptjs' 
import { redirect } from "next/navigation";
export const authOptions  = {
    providers : [ CredentialsProvider( 
       { 
        name: 'Credentials',
        credentials: {} ,    
        async authorize(credentials){
            const { email,password } = credentials 
            try{
               await connectMongoDB()
               const user = await User.findOne({ email })
               if(!user){
                return null
               }
            //    console.log('user in auth :', user);
              const passwordMatch =  await bcrypt.compare(password ,user.password)
               if(!passwordMatch){
                return null 
               }
               return user
            }catch(err){
                console.log(err);
            }
        }
      }
    ), 
     GooglePovider(
        {
         clientId:process.env.GOOGLE_CLIENT_ID ,
         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                    }
                    )
    ],
    callbacks:{
        async signIn ({user,account}){
  
            if(account.provider === 'google'){ 
                console.log('account.provider is : ',account.provider);
                
                try{
                    const {name, email } = user
                    await connectMongoDB() 
                    const userExist = await User.findOne({email})
                    console.log('userExist : ',userExist);
                if(userExist){
                 return user
             } 
             const res = await fetch('http://localhost:3000/api/registration/', {
                 
                 method: 'POST',
                 headers: { "Content-type": "appliction/json" },
                 body: JSON.stringify({ name, email, isAdmin: false })
                 
             })
                if(res.status === 200 || res.status === 201){
                    return user
                }
               
             }catch(err){
                 console.log('had aproblem saving google user to data base',err);
             }
            }         
           return user
     },
        async jwt({ token , user }){
            if(user){
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session ({session, token }){
            if(session.user){
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        },
        async redirect({ baseUrl }) {
            return baseUrl
          }
 
    },
    session:{
        strategy:'jwt', 
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/'
    }
}

const handler = nextAuth(authOptions)

export {handler as GET , handler as POST }