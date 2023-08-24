'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProjectCard from '@/components/ProjectCard';

const ExploreProjects = () => {
  const { data: session } = useSession();

  //* Fetch All Projects !

  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${session?.user.accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setAllProjects(data);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };
    fetchAllProjects();
  }, []);
  return (
    <div>
      <div className="my-24 mx-14 rounded-md grid grid-cols-3 gap-12">
        {allProjects.map((project) => (
          <ProjectCard
            key={project.project_id}
            id={project.project_id}
            title={project.project_name}
            desc={project.project_desc}
            path={`/consumer/allprojects/${project.project_id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreProjects;
