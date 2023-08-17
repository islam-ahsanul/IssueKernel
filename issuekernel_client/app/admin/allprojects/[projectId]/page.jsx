'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const page = ({ params }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/projects/${params.projectId}`,
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
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching project information:', error);
      }
    };

    fetchProject();
  }, []);
  console.log(projectDetails);
  const { project_name, project_desc, manager = {} } = projectDetails;
  const { email, full_name } = manager;

  console.log(email);
  return (
    <div className="mx-20">
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-red-500 ">
          This will be the title and desc card
          <div>This will be title space</div>
          <div>this will be desc space</div>
        </div>

        <div className="bg-blue">This will be manager card</div>
        <div className="bg-orange-500">This will be devs card</div>
      </div>
    </div>
  );
};

export default page;
