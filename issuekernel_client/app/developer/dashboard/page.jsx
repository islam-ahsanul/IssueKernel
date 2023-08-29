'use client';
import { useSession } from 'next-auth/react';

const DeveloperDashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-2xl tracking-widest my-2">
        Welcome to your dashboard,
      </div>
      <div className="fg_grad_secondary text-2xl tracking-widest my-2 font-bold">
        {session?.user.full_name}
      </div>

      <div className="text-white text-xl tracking-wider my-16">
        Explore and manage the issues assigned to you.
      </div>
    </div>
  );
};

export default DeveloperDashboard;
