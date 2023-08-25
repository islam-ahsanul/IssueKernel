'use client';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PostIssueModal from '@/components/PostIssueModal';

const ProjectDetails = ({ params }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectIssues, setProjectIssues] = useState([]);

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

  useEffect(() => {
    const fetchProjectIssues = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/issues/project/${params.projectId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setProjectIssues(data);
          console.log(projectIssues);
        } else {
          console.log(
            'Error fetching issue of this project:',
            response.statusText
          );
        }
      } catch (error) {
        console.log('Error fetching issue of this project:', error);
      }
    };
    fetchProjectIssues();
  }, [isModalOpen]);

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

      <h1 className="text-light-3 text-2xl mt-20 mb-10 font-semibold tracking-wide uppercase ">
        Issues of this product
      </h1>

      {projectIssues.map(
        (issue) => {
          let bground;
          if (issue.status === 'Submitted') {
            bground = 'gray-300';
          } else if (issue.status === 'Pending') {
            bground = 'orange-400';
          } else if (issue.status === 'Solved') {
            bground = 'lime-400';
          }
          return (
            <div
              className={`bg-${bground} w-full my-2 rounded-3xl flex flex-col items-center text-white`}
            >
              <div className="flex flex-col text-center w-full">
                <div className="my-2 tracking-wider text-black">
                  <span className="tracking-wide text-black font-semibold text-lg">
                    ISSUE:
                  </span>{' '}
                  {issue.title}
                </div>
                {/* <hr className="h-0.5 border-t-0  bg-gradient-to-r from-transparent via-white/50 to-transparent" /> */}
                <div className="mb-2 font-mono text-black">
                  {issue.description}
                </div>
                {/* <hr className="h-0.5 border-t-0  bg-gradient-to-r from-transparent via-white/50 to-transparent" /> */}
              </div>

              <div className="flex flex-row justify-between w-full mt-8 mb-2 gap-2">
                <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
                  <span className="text-black tracking-wide">Posted by: </span>
                  <span className="bg-dark-1 px-2 rounded-full py-0.5">
                    {issue.consumer_id.full_name}
                  </span>
                </div>
                <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
                  <span className="text-black tracking-wide">Posted at: </span>
                  <span className="bg-dark-1 px-2 rounded-full py-0.5">
                    {issue.submitted_date}
                  </span>
                </div>
                <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
                  <span className="text-black tracking-wide">Status: </span>
                  <span className={`bg-dark-1 px-2 rounded-full py-0.5`}>
                    {issue.status}
                  </span>
                </div>
              </div>
            </div>
          );
        }
        // <p>
        //   {issue.title} {issue.consumer_id.full_name}
        // </p>
      )}
    </div>
  );
};

export default ProjectDetails;
