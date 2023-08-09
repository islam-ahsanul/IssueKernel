'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import LandingNavbar from '@/components/LandingNavbar';
import { useContext, useEffect, useState } from 'react';
import VisitorLanding from '@/components/VisitorLanding';
import SignedLanding from '@/components/SignedLanding';
import { useUserSession } from './Context/session';

export default function Home() {
  const [user, setUser] = useState();
  const { userSession, setUserSession } = useUserSession();

  useEffect(() => {
    // Get the token from localStorage
    //! const token = localStorage.getItem('token');
    const token = Cookies.get('token');
    if (token) {
      // Decode the token and extract user information
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken);
    }

    setUserSession('Hoise');
  }, []);

  return (
    <>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <LandingNavbar user={user} setUser={setUser} />

      {user ? <SignedLanding email={user.email} /> : <VisitorLanding />}
      {userSession ? <p>{userSession}</p> : <p>hoynai</p>}
    </>
  );
}
