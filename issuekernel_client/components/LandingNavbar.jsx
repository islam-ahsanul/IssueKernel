import React from 'react';
import Link from 'next/link';

const LandingNavbar = () => {
  return (
    <nav className="flex justify-between items-center py-5 px-8 border-b border-nav-border gap-4">
      <div>LOGO</div>
      <Link href="/">Login</Link>
    </nav>
  );
};

export default LandingNavbar;
