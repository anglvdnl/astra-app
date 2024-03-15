import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const cookie = request.cookies.get("auth")
    let isExpired = false;

    isExpired = !cookie;

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
    matcher: ['/((?!api|_next/static|_next/image|icon.svg).*)'],
};
