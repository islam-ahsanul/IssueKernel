'use client';
import './globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

// import { Inter, Roboto_Mono } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IssueKernel',
  description: 'An issue tracker app!',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {/* <div className="main">
            <div className="gradient"></div>
          </div> */}
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
