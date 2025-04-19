import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    // console.log("Token", token)
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/Profile')) {
        
        if (!token) {
            const loginUrl = new URL('/Auth', request.url);
            return NextResponse.redirect(loginUrl);
        }

    }

    if (pathname.startsWith('/Auth')) {
        if (token) {
            const profileUrl = new URL('/Profile', request.url);
            return NextResponse.redirect(profileUrl);
        }
    }

    return NextResponse.next();
}
