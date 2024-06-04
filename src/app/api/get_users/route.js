import { NextResponse } from 'next/server';
import connectMongoDB from '../../libs/mongoDB'
import User from '../../models/user'

export async function GET () {

    try {
       await connectMongoDB ()
        const users =  await User.find()
        return NextResponse.json({users} ,{status: 200 })
   
    }catch ( err ) {
       console.log('had a problem finding users', err);
       return NextResponse.json({message: "had a problem finding users" }, {status: 500 } )
    }
   }
