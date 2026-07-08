import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
const authPages = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verification',
];
export default withAuth(
  async function middleware(request) {
    const url = request.nextUrl?.pathname;
    const token = request.nextauth?.token;
    const role = token?.user?.role;

    // admin protect
    if (role !== 'admin' && url.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // auth protect
    if (token && authPages.some(item => url.startsWith(item))) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized({ token, req }) {
        const url = req.nextUrl?.pathname;
        if (authPages.some(item => url.startsWith(item))) {
          return true;
        }
        if (token) {
          return true;
        } else return false;
      },
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/orders/:path*',
    '/checkout/:path*',
    '/admin/:path*',
    '/seller/:path*',
    '/settings/:path*',
    '/cart/:path*',
    '/login',
    '/register',
    '/forgot-password/:path*',
    '/reset-password/:path*',
    '/verification/:path*',
  ],
};
