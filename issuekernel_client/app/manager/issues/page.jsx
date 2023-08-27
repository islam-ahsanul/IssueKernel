'use client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Issues = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [projectIssues, setProjectIssues] = useState([]);
  const [devsOfProject, setDevsOfProject] = useState([]);
  const { data: session } = useSession();

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

  const fetchProjectIssues = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/issues/project/${projectId}`,
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
          console.log(projectDetails);
          fetchProjectIssues(data.project_id);
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

  const handleDeveloperChange = async (issueId, developerId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/issues/${issueId}/developer/${developerId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedIssue = await response.json();
        setProjectIssues((prevIssues) =>
          prevIssues.map((prevIssue) =>
            prevIssue.issue_id === updatedIssue.issue_id
              ? updatedIssue
              : prevIssue
          )
        );
      } else {
        console.log('Error updating issue developer:', response.statusText);
      }
    } catch (error) {
      console.log('Error updating issue developer:', error);
    }
  };

  return (
    <div className="mx-20 items-center flex flex-col">
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-gray-800/50 mt-3 mb-3 rounded-3xl">
          <div className="text-6xl px-4 pt-2 pb-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500 via-rose-300 to-indigo-800 bg-clip-text text-transparent tracking-wider">
            {projectDetails.project_name}
          </div>
          <hr className="h-0.5 border-t-0  bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <p className="pt-4 pb-1 px-4 text-light-3 tracking-wider">
            DESCRIPTION:{' '}
          </p>
          <div className="px-4 text-xl pb-4 pt-0 text-white tracking-wide">
            {projectDetails.project_desc}
          </div>
        </div>
      </div>

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

        <div className="col-span-2">POSTED AT</div>
        <div>STATUS</div>
        <div className="col-span-2">DEVELOPER</div>
      </div>

      {projectIssues.map((issue) => (
        <HoverCard key={issue.issue_id}>
          <HoverCardTrigger>
            <div
              className={`bg-white grid grid-cols-8 bg- w-full my-2 gap-4 py-2 px-2 rounded-xl cursor-pointer`}
            >
              <div className="truncate font-semibold">{issue.title}</div>
              <div className="col-span-2">
                <p className="truncate">{issue.description}</p>
              </div>
              <div className="col-span-2">{issue.submitted_date}</div>
              <div
                className={`text-white font-semibold bg-black text-center rounded-full`}
              >
                {issue.status}
              </div>
              <div className="col-span-2">
                <select
                  value={issue.developer_id ? issue.developer_id.user_id : -1}
                  onChange={(e) =>
                    handleDeveloperChange(issue.issue_id, e.target.value)
                  }
                  className="text-white bg-black rounded-full p-1 cursor-pointer"
                >
                  <option value={-1}>No developer assigned</option>
                  {devsOfProject.map((developer) => (
                    <option key={developer.user_id} value={developer.user_id}>
                      {developer.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col gap-4 text-lg">
              <div>
                <span className="text-violet-500 uppercase mr-2 text-sm">
                  Issue Titile:
                </span>{' '}
                <span className="font-bold tracking-wider">{issue.title}</span>
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
                  className={`font-bold tracking-wider bg-white text-black px-1 rounded-full`}
                >
                  {issue.status}
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default Issues;
