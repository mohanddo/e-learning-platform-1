import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    // console.log("Token", token)
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/profile')) {
        
        if (!token) {
            const loginUrl = new URL('/auth', request.url);
            return NextResponse.redirect(loginUrl);
        }

    }

    if (pathname.startsWith('/auth')) {
        if (token) {
            const profileUrl = new URL('/profile', request.url);
            return NextResponse.redirect(profileUrl);
        }
    }

    return NextResponse.next();
}
