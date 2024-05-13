import { NextResponse } from "next/server"

export async function GET () {
  const images = await fetch(`https://api.unsplash.com/search/photos/?query=girls&client_id=15mtyMgdr5wQ4UkJrz17VIF5R42qQbPKQhxpfx2DZ_g`)
console.log('images',images);
  return  NextResponse.json({images})
}