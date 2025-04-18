import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log("Token", token)
    const { pathname } = request.nextUrl;

    
    if (pathname.startsWith('/Profile')) {
        
        if (!token) {
            const loginUrl = new URL('/Auth', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // const requestHeaders = new Headers(request.headers);
        // requestHeaders.set('Authorization', `Bearer ${token}`);

        // return NextResponse.next({
        //     request: {
        //         headers: requestHeaders,
        //     },
        // });
    }

    if (pathname.startsWith('/Auth')) {
        if (token) {
            const profileUrl = new URL('/Profile', request.url);
            return NextResponse.redirect(profileUrl);
        }
    }

    return NextResponse.next();
}

// export const config = {
//     matcher: '/profile/:path*',
// };


