'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const TopBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/bug_icon_logo.png" alt="logo" width={28} height={28} />
        <p className="font-semibold text-white max-sm:hidden tracking-wider">
          IssueKernel
        </p>
      </Link>

      <div className="flex items-center gap-1">
        {/* <div className="block md:hidden">
          <div className="flex cursor-pointer" onClick={() => signOut()}>
            <Image src="/logout.svg" alt="logout" width={24} height={24} />
          </div>
        </div> */}
        <div className="block">
          <div className="flex gap-2 items-center">
            <Image src="/user.svg" width={24} height={24} />
            <p className="text-white font-semibold uppercase">
              {session?.user.full_name}
            </p>
            <p className="bg_grad_secondary text-sm px-1 rounded-full font-semibold">
              {session?.user.role}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
