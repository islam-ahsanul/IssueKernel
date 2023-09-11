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

      <div className="text-white text-xl tracking-wider my-16">
        Explore your project, manage developers under you and issues.
      </div>
      <div className="text-white text-xl tracking-wider my-16">
        {projectDetails.project_name}
        <h2>Issue Statistics</h2>
        <p>Total Issues: {statistics.totalIssues}</p>
        <p>Solved Issues: {statistics.solvedIssues}</p>
        <p>Pending Issues: {statistics.pendingIssues}</p>
        <p>Rejected Issues: {statistics.rejectedIssues}</p>
      </div>
    </div>
  );
};

export default ManagerDasgboard;
