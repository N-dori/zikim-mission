import { NextResponse } from "next/server";
import Room from "../../../models/room"
import connectMongoDB from "@/app/libs/mongoDB";

export async function POST (request) {

    try {
   
        const { name } = await request.json()
           
         await connectMongoDB ()
   
        const newRoom =  await Room.create({ name })
        return NextResponse.json({newRoom} ,{status: 200 })
      
    
    }catch ( err ) {
       console.log('had a problem creating new room', err);
       return NextResponse.json({message: "Had problem during registration",room }, {status: 500 } )
    }
   }