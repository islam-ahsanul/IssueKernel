import './globals.css';
import React from 'react';
import { UserSessionContextProvider } from './Context/session';
import { useUserSession } from './Context/session';

// import { Inter, Roboto_Mono } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IssueKernel',
  description: 'An issue tracker app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>Hello</h1>
        {/* <div className="main">
            <div className="gradient"></div>
          </div> */}
        <main>
          <UserSessionContextProvider>{children}</UserSessionContextProvider>
        </main>
      </body>
    </html>
  );
}
