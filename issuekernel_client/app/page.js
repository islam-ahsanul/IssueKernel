'use client';

import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';
import { useContext, useEffect, useState } from 'react';
import VisitorLanding from '@/components/VisitorLanding';
import SignedLanding from '@/components/SignedLanding';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  // console.log({ session });

  return (
    <>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <LandingNavbar />

      {session?.user ? <SignedLanding /> : <VisitorLanding />}
    </>
  );
}
