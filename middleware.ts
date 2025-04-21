import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    
    function middleware(){
        return NextResponse.next();
    },
    {
        callbacks:{
            authorized: ({token , req}) => {
                const {pathname} = req.nextUrl;

                // Allow the requests if the following is true
                if(
                    pathname.startsWith("/api/auth")
                    || pathname.startsWith("/login")
                    || pathname.startsWith("/register")
                ){
                    return true;
                }

                // public 
                if(
                    pathname.startsWith('/') || pathname.startsWith('/api/videos')
                ){
                    return true;
                }

                return !!token
            }
        }
    }  
)


export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}