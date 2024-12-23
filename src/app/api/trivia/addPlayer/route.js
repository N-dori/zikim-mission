import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Room from '../../../models/room';

export async function PUT(request) {
  try {
    const bodyReq = await request.json();
    
    
    
    const { roomId, player } = bodyReq;


    // Validate the presence of roomId and player
    if (!roomId || !player) {
      throw new Error('Missing roomId or player in request body');
    }
//mongo will creact an _id for this obj
    const newPlayer = {
      name:player.name,
      nickName: player.nickName,
      img: player.img,
      isAdmin: player.isAdmin,
      answers: []
    };

    await connectMongoDB();

    const updateResult = await Room.findByIdAndUpdate(
      roomId,
      { $push: { participants: newPlayer } },
      { new: true, useFindAndModify: false }
    );

   

    return NextResponse.json({ message: "Room was updated", updateResult }, { status: 200 });
  } catch (err) {
    console.error('Had a problem updating room participants list', err);
    return NextResponse.json({ message: "Had a problem updating the room" }, { status: 500 });
  }
}