import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { auth } from "@/lib/auth";
import { auth } from "@/lib/auth";
export async function middleware(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/orders", request.url));
    }
    return NextResponse.next();
}

// マッチするパスを指定
export const config = {
    matcher: "/",
};
