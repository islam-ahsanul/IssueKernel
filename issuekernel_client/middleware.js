import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// export { default } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== 'Admin'
    )
      return NextResponse.rewrite(
        new URL('/login?message=You are not Authorized!', req.url)
      );

    if (
      req.nextUrl.pathname.startsWith('/manager') &&
      req.nextauth.token?.role !== 'Manager'
    )
      return NextResponse.rewrite(
        new URL('/login?message=You are not Authorized!', req.url)
      );
    if (
      req.nextUrl.pathname.startsWith('/developer') &&
      req.nextauth.token?.role !== 'Developer'
    )
      return NextResponse.rewrite(
        new URL('/login?message=You are not Authorized!', req.url)
      );
    if (
      req.nextUrl.pathname.startsWith('/consumer') &&
      req.nextauth.token?.role !== 'Consumer'
    )
      return NextResponse.rewrite(
        new URL('/login?message=You are not Authorized!', req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/manager/:path*',
    '/developer/:path*',
    '/consumer/:path*',
  ],
};
