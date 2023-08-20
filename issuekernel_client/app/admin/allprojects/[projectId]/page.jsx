'use client';

import ChangeManagerModal from '@/components/ChangeManagerModal';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const { data: session } = useSession();
  const router = useRouter();
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
          <div className="px-4 text-xl pb-4 pt-0 text-white tracking-tighter">
            {project_desc}
          </div>
        </div>

        <div className="flex flex-col bg-gray-800/50 mt-2 mb-2 rounded-3xl">
          <div className="flex flex-row">
            <p className="pt-4 pb-1 px-4 text-light-3 tracking-wider">
              MANAGER
            </p>
            <button
              className="bg-blue-500 hover:bg-blue text-white px-4 py-2 rounded"
              onClick={openModal}
            >
              Open Modal
            </button>
            {isModalOpen && (
              <ChangeManagerModal onClose={closeModal} projectId={project_id} />
            )}
          </div>
          <p className="text-white">
            {manager ? `${manager.full_name}` : 'No manager assigned'}
          </p>
        </div>
        <div className="bg-orange-500">This will be devs card</div>
      </div>
    </div>
  );
};

export default page;

// bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-purple-200 to-yellow-200
// bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-green-300 via-indigo-800 to-blue-400
// bg-gradient-to-br from-violet-800 via-zinc-300 to-purple-300
// bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500 via-rose-300 to-indigo-800 --this one
// bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-900 via-fuchsia-200 to-amber-800
// bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-800 via-violet-600 to-neutral-400
// bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-purple-500 via-violet-700 to-indigo-200
