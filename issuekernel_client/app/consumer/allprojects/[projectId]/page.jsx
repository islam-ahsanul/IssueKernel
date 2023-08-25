'use client';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PostIssueModal from '@/components/PostIssueModal';

const ProjectDetails = ({ params }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const {
    project_id,
    project_name,
    project_desc,
    manager = {},
  } = projectDetails;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // router.refresh();
  };

  return (
    <div className="mx-20 items-center flex flex-col">
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-gray-800/50 mt-3 mb-3 rounded-3xl">
          <div className="text-6xl px-4 pt-2 pb-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500 via-rose-300 to-indigo-800 bg-clip-text text-transparent tracking-wider">
            {project_name}
          </div>
          <hr className="h-0.5 border-t-0  bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <p className="pt-4 pb-1 px-4 text-light-3 tracking-wider">
            DESCRIPTION:{' '}
          </p>
          <div className="px-4 text-xl pb-4 pt-0 text-white tracking-wide">
            {project_desc}
          </div>
        </div>
      </div>
      <div
        className="bg-grad-grape-start hover:bg_grad_primary rounded-full cursor-pointer py-0.5 w-auto px-4"
        onClick={openModal}
      >
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/plus.svg" height={20} width={20} />
          <p className="text-white tracking-wider text-xl font-semibold">
            Report an issue
          </p>
        </div>
      </div>
      {isModalOpen && (
        <PostIssueModal onClose={closeModal} projectId={project_id} />
      )}
    </div>
  );
};

export default ProjectDetails;
