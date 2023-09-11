'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const ManagerDasgboard = () => {
  const { data: session } = useSession();
  const [projectDetails, setProjectDetails] = useState({});
  const [statistics, setStatistics] = useState({});

  const fetchIssueStats = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/issues/project/${projectId}/statistics`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setStatistics(data);
        console.log('💡');
        console.log(data);
      } else {
        console.log('Error fetching stats', response.statusText);
      }
    } catch (error) {
      console.log('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const fetchProject = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/projects/manager/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setProjectDetails(data);
          fetchIssueStats(data.project_id);
          // fetchDevsOfProject(data.project_id);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching project information:', error);
      }
    };

    if (session?.user?.user_id) {
      fetchProject(session.user.user_id);
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

      <div className="text-white text-xl tracking-wider mt-16 mb-5">
        Explore your project, manage developers under you and issues.
      </div>
      <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-3xl w-72">
        <div className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
          Your Project
        </div>
        <div className="text-gray-400 mt-2 mb-3 tracking-widest font-bold purple_gradient text-3xl">
          {projectDetails.project_name}
        </div>
        {/* <h2>Issue Statistics</h2>
        <p>Total Issues: {statistics.totalIssues}</p>
        <p>Solved Issues: {statistics.solvedIssues}</p>
        <p>Pending Issues: {statistics.pendingIssues}</p>
        <p>Rejected Issues: {statistics.rejectedIssues}</p> */}
      </div>

      <div className="grid grid-cols-8 gap-2 w-full h-32 mt-10">
        <div className="flex flex-col bg-gray-800/50 col-span-2 items-center rounded-2xl">
          <p className="text-gray-400 text-xl tracking-wide mt-2 mb-3">
            Total Issues
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

export default ManagerDasgboard;
