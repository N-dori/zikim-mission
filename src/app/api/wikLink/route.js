import { NextResponse } from "next/server"

export async function POST (request) {
    try{
  
      const { txt } = await request.json()
      const url =`https://he.wikipedia.org/w/api.php?action=opensearch&search=${txt}&limit=1&format=json`
      const res = await fetch(url)
      const data = await res.json()
      return NextResponse.json( {data} )
    }catch(err){
      console.log(err);
    }
     
  
  }