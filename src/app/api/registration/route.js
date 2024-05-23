import connectMongoDB from '../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../models/user'


export async function POST (request) {

 try {

     const { name , email, battalion ,password } = await request.json()
     console.log('going to create user :', name , email, battalion ,password );
  
      console.log('password currect' );
      
      await connectMongoDB ()
      console.log('going to create user :', name , email, battalion ,password );
     const user =  await User.create({ name , email, battalion ,password })
     return NextResponse.json({message: "User creacted" }, {status: 201 } )
     
   
 
 }catch ( err ) {
    console.log('had a problem creating new user', err);
    return NextResponse.json({message: "Had problem during registration" }, {status: 500 } )
 }
}