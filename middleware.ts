import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from 'jose'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const cookie = request.cookies.get("jwt-auth")
    let isExpired = false;

    if (cookie) {
        const secretKeyUint8Array = new TextEncoder().encode(process.env.secretKey);
        try {
            const value = await jwtVerify(cookie.value, secretKeyUint8Array);
            isExpired = false;
            response.headers.set('x-user-uid', <string>value.payload.name)
        } catch (error) {
            console.log(error);
            isExpired = true;
        }
    } else {
        isExpired = true;
    }

    if (isExpired && !request.nextUrl.pathname.startsWith("/auth")) {
        const redirect = new URL("/auth", request.url);
        if (request.nextUrl.pathname) {
            redirect.search = new URLSearchParams({
                next: request.nextUrl.pathname,
            }).toString();
        } else {
            redirect.search = new URLSearchParams({
                next: '/',
            }).toString();
        }
        return NextResponse.redirect(redirect);
    }

    if (!isExpired && request.nextUrl.pathname.startsWith("/auth")) {
        const nextUrl = request.headers.get("next-url") as string
        if (nextUrl) {
            const redirect = new URL(nextUrl, request.url);
            return NextResponse.redirect(redirect);
        }
        const redirect = new URL(`/`, request.url);
        return NextResponse.redirect(redirect);
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
