'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

const ConsumerTopBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="font-semibold text-white max-sm:hidden">IssueKernel</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block">
          <div className="flex gap-2 items-center">
            <Image src="/user.svg" width={24} height={24} />
            <p className="text-white font-semibold">
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

export default ConsumerTopBar;
