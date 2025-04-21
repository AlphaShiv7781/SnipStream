import ImageKit  from "imagekit";
import { NextResponse } from "next/server";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try{

     const authenticationParameters = imageKit.getAuthenticationParameters();
     return NextResponse.json(authenticationParameters); 
  }catch (error) {
    return NextResponse.json(
        {error: "ImageKit authentication failed"},
        { status: 500, }
    )
  }
}