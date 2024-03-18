import { NextResponse, type NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("user-token")?.value;

    const verifiedToken = token && await verifyAuth(token).catch((error) => {
        console.log(error);
    });

    if(req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
        return;
    }

    const url = req.url;

    if(url.includes("/login") && verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard", url));
    }

    if(!verifiedToken) {
        return NextResponse.redirect(new URL("/login", url));
    }
}

export const config = {
    matcher: ["/dashboard", "/login"],
}