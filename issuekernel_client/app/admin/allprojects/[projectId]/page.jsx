'use client';

import ChangeManagerModal from '@/components/ChangeManagerModal';
import DevsOfProject from '@/components/DevsOfProject';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
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
  }, [isModalOpen]);

  // console.log(projectDetails);
  const {
    project_id,
    project_name,
    project_desc,
    manager = {},
  } = projectDetails;
  // const { email, full_name } = manager;

  // console.log('📌📌📌');
  // console.log(manager.email);
  // console.log(manager.full_name);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // router.refresh();
  };

  return (
    <div className="mx-20">
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-gray-800/50 mt-3 mb-6 rounded-3xl">
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

        <div className="flex flex-col bg-gray-800/50 mt-2 mb-2 rounded-3xl pb-3">
          <div className="flex flex-row mt-3 items-center">
            <p className=" bg_grad_secondary text-black tracking-wider my-3 mx-3 px-3 rounded-full py-0.5">
              MANAGER
            </p>
            <div
              className=" hover:bg-grad-grape-start text-light-3 rounded-full cursor-pointer px-2 py-0.5"
              onClick={openModal}
            >
              <div className="flex flex-row gap-2">
                <Image src="/edit.svg" height={20} width={20} />
                <p className="text-gray-400">Change Manager</p>
              </div>
            </div>
            {isModalOpen && (
              <ChangeManagerModal onClose={closeModal} projectId={project_id} />
            )}
          </div>
          <div className="flex flex-row  my-2 mx-4 gap-2">
            <Image src="/user.svg" width={24} height={24} alt="manager" />
            <p className="text-white font-semibold tracking-widest">
              {manager ? `${manager.full_name}` : 'No Manager Assigned'}
            </p>
          </div>
        </div>

        <DevsOfProject projectId={params.projectId} />
      </div>
    </div>
  );
};

export default page;

