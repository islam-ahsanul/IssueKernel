'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const DeveloperDashboard = () => {
  const { data: session } = useSession();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchIssueStats = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/issues/developer/${id}/statistics`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setStatistics(data);
          console.log(data);
          // fetchDevsOfProject(data.project_id);
        } else {
          console.log('Error fetching stat:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching stat:', error);
      }
    };

    if (session?.user?.user_id) {
      fetchIssueStats(session.user.user_id);
    }
  }, [session]);

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

      <div className="grid grid-cols-8 gap-2 w-full h-32 mt-10">
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Assigned Issues
          </p>
          <p className="text-white text-6xl tracking-wide justify-center">
            {statistics.totalIssues}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Solved
          </p>
          <p className="text-green-500 text-6xl tracking-wide justify-center">
            {statistics.solvedIssues}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Pending
          </p>
          <p className="text-orange-400 text-6xl tracking-wide justify-center">
            {statistics.pendingIssues}
          </p>
        </div>
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Rejected
          </p>
          <p className="text-rose-600 text-6xl tracking-wide justify-center">
            {statistics.rejectedIssues}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
