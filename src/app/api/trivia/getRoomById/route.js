
 import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Room from '../../../models/room'
export async function POST (request) {

 try {

     const {  name  } = await request.json()
    await connectMongoDB ()
     const room =  await Room.findOne({ name })

   //  to get only the id
   //  const user =  await User.findOne({ email }).select('_id')
 
  return NextResponse.json({room}, {status: 201 } )

 }catch ( err ) {
    console.log('had a problem finding user', err);
    return NextResponse.json({message: "had a problem finding user" }, {status: 500 } )
 }
}
