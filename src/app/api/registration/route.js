import connectMongoDB from '../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../models/user'
import bcrypt from 'bcryptjs' 


export async function POST (request) {

 try {

     const { name , email, battalion ,password } = await request.json()
        
      await connectMongoDB ()
      console.log('going to create user :', name , email, battalion ,password );
      if(password !== 'zikim8130bvb')return null
      const hasedPassword = await bcrypt.hash( password , 10 )

     const user =  await User.create({ name , email, battalion ,password:hasedPassword })
     return NextResponse.json({message: "User creacted"}, {status: 201 } )
     
   
 
 }catch ( err ) {
    console.log('had a problem creating new user', err);
    return NextResponse.json({message: "Had problem during registration" }, {status: 500 } )
 }
}