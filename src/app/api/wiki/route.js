import { NextResponse } from "next/server"


// export async function POST (request) {

//     const { line } = await request.json()

//    await connectMongoDB ()
//    await PickupLine.create({ line })

//  return NextResponse.json({message: "PicupLine creacted" }, {status: 201 } )
// }

export async function POST (request) {
  try{

    const { txt } = await request.json()
    const url =`https://he.wikipedia.org/w/api.php?action=query&titles=${txt}&prop=extracts&format=json&exintro=1`
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json({data} )
  }catch(err){
    console.log(err);
  }
   

}

// export async function DELETE (request) {
//     const id = request.nextUrl.searchParams.get('id')
//     await connectMongoDB ()
//     await PickupLine.findByIdAndDelete(id)
//     return NextResponse.json({message: "PicupLine deleted" }, {status: 200 } )

// }