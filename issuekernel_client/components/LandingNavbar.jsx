import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from './UserContext';

const LandingNavbar = () => {
  const { user, setUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
    // <nav className="flex justify-between items-center py-5 px-8 border-b border-nav-border gap-4">
    <nav className="flex flex-between w-full md-16 pt-3 py-5 px-20">
      <div>
        <Link href="/">
          <Image src="/next.svg" width={115} height={43} alt="IssueKernel" />
        </Link>
      </div>
      {user ? (
        <button className="black_btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link href="/login" className="black_btn">
          Login
        </Link>
      )}
    </nav>
  );
};

export default LandingNavbar;
