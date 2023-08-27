'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export const sidebarLinks = [
  {
    imgURL: '/home.svg',
    route: `/manager/dashboard`,
    label: 'Dashboard',
  },
  {
    imgURL: '/projects.svg',
    route: '/manager/issues',
    label: 'Issues',
  },

  {
    imgURL: '/developer.svg',
    route: '/manager/developers',
    label: 'Developers',
  },
];

const ManagerLeftSidebar = () => {
  const router = useRouter();
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

export default ManagerLeftSidebar;
