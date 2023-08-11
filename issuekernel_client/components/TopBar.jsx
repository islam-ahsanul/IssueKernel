'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';

const TopBar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="font-semibold text-white max-sm:hidden">IssueKernel</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer" onClick={() => signOut()}>
            <Image src="/logout.svg" alt="logout" width={24} height={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
