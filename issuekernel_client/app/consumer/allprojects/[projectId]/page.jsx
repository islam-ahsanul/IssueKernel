'use client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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
      <div
        className={`grid grid-cols-8 bg-dark-2 w-full my-2 text-white gap-4 py-2 px-2 rounded-full`}
      >
        <div>TITLE</div>
        <div className="col-span-2">
          <p className="truncate ">DESCRIPTION</p>
        </div>
        <div className="col-span-2">POSTED BY</div>
        <div className="col-span-2">POSTED AT</div>
        <div>STATUS</div>
      </div>

      {projectIssues.map(
        (issue) => {
          let bground;
          let fground;
          if (issue.status === 'Submitted') {
            bground = 'bg-gray-300';
            fground = 'text-gray-300';
          } else if (issue.status === 'Pending') {
            bground = 'bg-orange-400';
            fground = 'text-orange-400';
          } else if (issue.status === 'Solved') {
            bground = 'bg-green-500';
            fground = 'text-green-500';
          } else {
            bground = 'bg-rose-600';
            fground = 'text-rose-600';
          }
          return (
            // <div
            //   className={`bg-${bground} w-full my-2 rounded-3xl flex flex-col items-center text-white`}
            // >
            //   <div className="flex flex-col text-center w-full">
            //     <div className="my-2 tracking-wider text-black mx-4">
            //       <span className="tracking-wide text-black text-lg">
            //         Issue:
            //       </span>{' '}
            //       <span className="font-bold">{issue.title}</span>
            //     </div>

            //     <div className="mb-2 font-mono text-black mx-4">
            //       {issue.description}
            //     </div>

            //   </div>

            //   <div className="flex flex-row justify-between w-full mt-8 mb-2 gap-2">
            //     <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
            //       <span className="text-black tracking-wide">Posted by: </span>
            //       <span className="bg-dark-1 px-2 rounded-full py-0.5">
            //         Posted by: {issue.consumer_id.full_name}
            //       </span>
            //     </div>
            //     <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
            //       <span className="text-black tracking-wide">Posted at: </span>
            //       <span className="bg-dark-1 px-2 rounded-full py-0.5">
            //         {issue.submitted_date}
            //       </span>
            //     </div>
            //     <div className="mx-2 flex flex-row items-center gap-1 font-semibold">
            //       <span className="text-black tracking-wide">Status: </span>
            //       <span className={`bg-dark-1 px-2 rounded-full py-0.5`}>
            //         {issue.status}
            //       </span>
            //     </div>
            //   </div>
            // </div>

            <HoverCard key={issue.issue_id}>
              <HoverCardTrigger>
                <div
                  className={`${bground} grid grid-cols-8 bg- w-full my-2 gap-4 py-2 px-2 rounded-xl cursor-pointer`}
                >
                  <div className="truncate font-semibold">{issue.title}</div>
                  <div className="col-span-2">
                    <p className="truncate">{issue.description}</p>
                  </div>
                  <div className="truncate col-span-2">
                    {issue.consumer_id.full_name}
                  </div>
                  <div className="col-span-2">{issue.submitted_date}</div>
                  <div
                    className={`${fground} font-semibold bg-black text-center rounded-full`}
                  >
                    {issue.status}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-4 text-lg">
                  <div>
                    <span className="text-violet-500 uppercase mr-2 text-sm">
                      Issue Titile:
                    </span>{' '}
                    <span className="font-bold tracking-wider">
                      {issue.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-violet-500 uppercase  mr-2 text-sm">
                      Issue Description:
                    </span>
                    <span className="font-bold tracking-wider">
                      {issue.description}
                    </span>
                  </div>
                  <div>
                    <span className="text-violet-500 uppercase  mr-2 text-sm">
                      Posted by:
                    </span>
                    <span className="font-bold tracking-wider">
                      {issue.consumer_id.full_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-violet-500 uppercase  mr-2 text-sm">
                      Posted at:
                    </span>
                    <span className="font-bold tracking-wider">
                      {issue.submitted_date}
                    </span>
                  </div>
                  <div>
                    <span className="text-violet-500 uppercase mr-2 text-sm">
                      Status:
                    </span>
                    <span
                      className={`font-bold tracking-wider ${bground} text-black px-1 rounded-full`}
                    >
                      {issue.status}
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        }
  
      )}
    </div>
  );
};

export default ProjectDetails;
