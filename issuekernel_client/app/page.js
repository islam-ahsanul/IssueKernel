'use client';
import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';
import { useContext, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import VisitorLanding from '@/components/VisitorLanding';

export default function Home() {
  const { user, setUser } = useUser();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token and extract user information
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      // Set the user in context
      setUser(decodedToken);
    }
  }, []);

  return (
    <>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <LandingNavbar />

      {user ? <h3>{user.full_name}</h3> : <VisitorLanding />}
    </>
  );
}
