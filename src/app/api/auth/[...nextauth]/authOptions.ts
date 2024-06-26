
import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs' 
import  { AuthOptions } from "next-auth";

type Credentials = {
    email:string,
    password:string
}
export const authOptions:AuthOptions = {

    providers: [
        CredentialsProvider(
            {
                name: 'Credentials',
                credentials: {},
                async authorize(credentials) {
                    try {
                    const { email, password } = credentials as Credentials

                        await connectMongoDB()
                        const user = await User.findOne({ email })
                        if (!user) {
                            return null
                        }
                       
                        const passwordMatch =  await bcrypt.compare(password ,user.password)
                        if(!passwordMatch){
                         return null 
                        }

                        return user
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        ),

    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30 * 3 // 60 seconds * 60 minutes * 24 hours * 30 days * 3 month
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signup'
    }
}