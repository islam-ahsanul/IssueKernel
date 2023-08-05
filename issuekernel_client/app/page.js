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
    <>
      <LandingNavbar />
      <section className="flex flex-center flex-col paddings mt-15 mx-20">
        <h1 className="font-mono font-extrabold text-5xl text-black tracking-wide text-left blue_gradient transition-all hover:scale-105 hover:ease-linear duration-150">
          Step into a world of organized projects and efficient issue resolution
          with IssueKernel.
        </h1>
        <h1 className="font-mono font-semibold text-xl text-black text-center mx-16 mt-20 mb-11 ">
          Harmonizes user experiences and developer expertise, a fusion that
          powers effective solutions.
        </h1>
        <h2>Login req</h2>
        <h2>or</h2>
        <h2>Signup req</h2>
        {user ? <h3>{user.full_name}</h3> : <h3>NOT LOGGED IN</h3>}
      </section>
    </>
  );
}
