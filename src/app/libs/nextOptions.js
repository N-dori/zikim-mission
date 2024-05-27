import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs' 

  const authOptions = {
    providers: [
        CredentialsProvider(
            {
                name: 'Credentials',
                credentials: {},
                async authorize(credentials) {
                    try {
                    const { email, password } = credentials

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
        maxAge: 60 * 5
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signup'
    }
}
