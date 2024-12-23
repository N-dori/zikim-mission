import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongoDB";
import Room from "../../../models/room"


export async function POST (request) {

    try {
        const  {_id} = await request.json()   
       await connectMongoDB ()
        const room  =  await Room.findOne({ _id })
        if (!room) {
            return room.status(404).json({ error: 'Room not found' });
          }
        return NextResponse.json({room } ,{status: 200 })
   
    }catch ( err ) {

       console.log('had a problem finding users', err);
       return NextResponse.json({message: "had a problem finding users" }, {status: 500 } )
       
    }
   }
