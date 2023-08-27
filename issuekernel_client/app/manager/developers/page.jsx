'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const DevsOfThisProject = () => {
  const { data: session } = useSession();

  const [devsOfProject, setDevsOfProject] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});

  const fetchDevsOfProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/developer-projects/${projectId}/developers`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setDevsOfProject(data);
        console.log('💡');
        console.log(data);
      } else {
        console.log('Error fetching Devs of Project:', response.statusText);
      }
    } catch (error) {
      console.log('Error fetching Devs of Project:', error);
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
          fetchDevsOfProject(data.project_id);
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

  return <div>DevsOfThisProject</div>;
};

export default DevsOfThisProject;
