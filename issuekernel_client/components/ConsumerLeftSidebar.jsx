'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const sidebarLinks = [
  {
    imgURL: '/home.svg',
    route: `/consumer/dashboard`,
    label: 'Dashboard',
  },

  {
    imgURL: '/projects.svg',
    route: '/consumer/allprojects',
    label: 'Explore Products',
  },

  {
    imgURL: '/request.svg',
    route: '/consumer/issues',
    label: 'Issue History',
  },
];

const ConsumerLeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.label}>
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && 'bg_grad_primary'}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <div
          className="flex cursor-pointer gap-4 p-4"
          onClick={() => signOut()}
        >
          <Image src="/logout.svg" alt="logout" width={24} height={24} />
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default ConsumerLeftSidebar;
