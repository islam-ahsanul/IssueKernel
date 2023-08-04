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
    <nav className="flex justify-between w-full pt-3 px-5 md:px-20 gap-10">
      <div>
        <Link href="/">
          <Image
            src="/issuekernel_logo.svg"
            width={220}
            height={43}
            alt="IssueKernel"
          />
        </Link>
      </div>
      {user ? (
        <button className="black_btn max-h-10" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link href="/login" className="black_btn max-h-10">
          Login
        </Link>
      )}
    </nav>
  );
};

export default LandingNavbar;
