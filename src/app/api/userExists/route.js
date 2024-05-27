
import connectMongoDB from '../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../models/user'

export async function POST (request) {

 try {

     const {  email  } = await request.json()
    await connectMongoDB ()
     const user =  await User.findOne({ email })

   //  to get only the id
   //  const user =  await User.findOne({ email }).select('_id')

    console.log('user', user  );
 
  return NextResponse.json({user}, {status: 201 } )

 }catch ( err ) {
    console.log('had a problem finding user', err);
    return NextResponse.json({message: "had a problem finding user" }, {status: 500 } )
 }
}
