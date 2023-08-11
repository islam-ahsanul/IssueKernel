'use client';

import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';
import { useContext, useEffect, useState } from 'react';
import VisitorLanding from '@/components/VisitorLanding';
import SignedLanding from '@/components/SignedLanding';
import { useSession } from 'next-auth/react';

export default function Home() {
  //! const [user, setUser] = useState();

  //! useEffect(() => {
  // Get the token from localStorage
  //! const token = localStorage.getItem('token');
  //! const token = Cookies.get('token');
  //! if (token) {
  // Decode the token and extract user information
  //! const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //! setUser(decodedToken);
  //!  }

  //! setUserSession('Hoise');
  //!  }, []);

  const { data: session } = useSession();

  console.log({ session });

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
