import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react';
// import Cookies from 'js-cookie';

const LandingNavbar = () => {
  const { data: session } = useSession();
  // console.log(`🌳Current Session: ${session}`);

  return (
    // <nav className="flex justify-between items-center py-5 px-8 border-b border-nav-border gap-4">
    <nav className="flex justify-between w-full pt-3 px-5 md:px-20 gap-10">
      <div>
        <Link href="/">
          <Image
            src="/issuekernel_logo.svg"
            width={220}
            height={43}
            alt="IssueKernel"
            className="transition-all hover:scale-125 hover:ease-linear duration-150"
          />
        </Link>
      </div>
      {session?.user ? (
        <button
          className="white_btn max-h-10 hover:bg-transparent hover:border-1 transition-transform hover:scale-125 motion-reduce:transform-none"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="white_btn max-h-10 hover:bg-transparent hover:border-1 transition-transform hover:scale-125 motion-reduce:transform-none"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default LandingNavbar;
