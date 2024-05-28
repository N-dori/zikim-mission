import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export  async function middleware(req) {
   
    const isAuthenticated = await getToken({ req });

    // you implement your logic

   if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
}

// in the same file, you need to specify for which routes tou want to run this middleware

export const config = {
                        matchter: ["/menu",],
                      }