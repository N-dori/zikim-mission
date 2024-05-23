import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions: AuthOptions  = {
    providers: [
        CredentialsProvider(
        {
            name: 'Credentials',
            credentials: {},
            async authorize(credentials:{ email:any , password:any }) {
                    const {  email , password } = credentials

              
                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null
                    }
                    console.log('user in auth :', user);
                    const passwordMatch = "zikim8130bvb"
                    if (!passwordMatch === password) {
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
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }