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
            className="transition-all hover:scale-125 hover:ease-linear duration-150"
          />
        </Link>
      </div>
      {user ? (
        <button className="black_btn max-h-10" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="black_btn max-h-10 hover:bg-transparent hover:border-1 transition-transform hover:scale-125 motion-reduce:transform-none"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default LandingNavbar;
// border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100
