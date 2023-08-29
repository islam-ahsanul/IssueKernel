'use client';
import UserCard from '@/components/UserCard';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AdminDashboard = () => {
  const [userCountsByRole, setUserCountsByRole] = useState({});
  const [totalUserCount, setTotalUserCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserCountsByRole = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/user-counts-by-role',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUserCountsByRole(data);
          console.log(data);
        } else {
          console.log(
            'Error fetching user counts by role:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchTotalUserCount = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/total-user-count',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTotalUserCount(data);
          console.log(data);
        } else {
          console.log('Error fetching total user count:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchUserCountsByRole();
    fetchTotalUserCount();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-2xl tracking-widest my-2">
        Welcome to you dashboard,
      </div>
      <div className="fg_grad_secondary text-2xl tracking-widest my-2 font-bold">
        {session?.user.full_name}
      </div>

      <div className="grid grid-cols-8 gap-2 w-full h-32 mt-10">
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Toral User Count
          </p>
          <p className="text-white text-6xl tracking-wide justify-center">
            {totalUserCount}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Manager Count
          </p>
          <p className="text-white text-6xl tracking-wide justify-center">
            {userCountsByRole.Manager}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Developer Count
          </p>
          <p className="text-white text-6xl tracking-wide justify-center">
            {userCountsByRole.Developer}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Consumer Count
          </p>
          <p className="text-white text-6xl tracking-wide justify-center">
            {userCountsByRole.Consumer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
