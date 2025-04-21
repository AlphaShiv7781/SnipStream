"use client";
import { ImageKitProvider} from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }){

    const authenticator = async ()=>{
        try{
            const response = await fetch("/api/imagekit-auth");
    
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            const {signature, token, expire} = data;
            return { signature: String(signature), token: String(token), expire: Number(expire) };  
    
        }
        catch (error) {
            console.error("Imagekit authentication failed");
            throw error;
        }
    }; 

    return (
        <SessionProvider>
        <ImageKitProvider
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
        >
            {children}
        </ImageKitProvider>
        </SessionProvider>
    );
}