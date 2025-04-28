import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isLogged = request.cookies.get('isLogged')?.value;

    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/profile') || pathname.startsWith('/changePassword') || pathname.startsWith('/cart')) {
        
        if (!token || !isLogged) {
            const loginUrl = new URL('/auth', request.url);
            return NextResponse.redirect(loginUrl);
        }

    }



    if (pathname.startsWith('/auth')) {
        if (token && isLogged) {
            const profileUrl = new URL('/profile', request.url);
            return NextResponse.redirect(profileUrl);
        }
    }

    return NextResponse.next();
}
