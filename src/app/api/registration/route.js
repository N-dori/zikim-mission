import connectMongoDB from '../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../models/user'
import bcrypt from 'bcryptjs' 

export async function POST (request) {

 try {

     const { name , email , password , isAdmin } = await request.json()
   if(password){
      const hasedPassword = await bcrypt.hash( password , 10 )
      await connectMongoDB ()
      console.log('going to create user :', name , email ,   isAdmin , hasedPassword );
     const user =  await User.create({ name, email , password:hasedPassword, isAdmin })
     return NextResponse.json({message: "User creacted" }, {status: 201 } )
     
   }  else{
      await connectMongoDB ()
      console.log('going to create user :', name , email , isAdmin );
      const user =  await User.create({ name, email ,  isAdmin })
      return NextResponse.json({message: "User creacted" }, {status: 201 } )
      
   }
 

 }catch ( err ) {
    console.log('had a problem creating new user', err);
    return NextResponse.json({message: "Had problem during registration" }, {status: 500 } )
 }
}