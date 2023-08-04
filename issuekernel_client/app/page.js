'use client';
import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';
import { useContext, useEffect } from 'react';
import { useUser } from '@/components/UserContext';

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
    // <section className="w-full flex-center flex-col m-15">
    //   <h1 className="head_text text-center">
    //     <span className="orange_gradient text-center">Welcome</span>
    //   </h1>
    // </section>
    <>
      <LandingNavbar />
      <section className="flex-center flex-col paddings m-15">
        <h1>Intro Text</h1>
        <h2>Login State</h2>
        <h2>Login req</h2>
        <h2>or</h2>
        <h2>Signup req</h2>
        {user ? <h3>{user.full_name}</h3> : <h3>NOT LOGGED IN</h3>}
      </section>
    </>
  );
}
