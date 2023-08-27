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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white text-3xl mb-10 font-semibold">
        Developers in this project
      </h1>
      {devsOfProject.map((dev) => (
        <article className="rounded-2xl bg-gray-800/50 p-4 m-2 w-full">
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-white">
                {dev.full_name}
              </h3>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 font-semibold text-lg">{dev.email}</p>
            </div>

            <div className="text-gray-400 font-semibold text-lg">
              {projectDetails.project_name}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DevsOfThisProject;
