'use client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const DeveloperIssues = () => {
  const { data: session } = useSession();
  const [devIssues, setDevIssues] = useState([]);

  useEffect(() => {
    const fetchDevIssues = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/issues/developer/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log(devIssues);
          setDevIssues(data);
        } else {
          console.log(
            'Error fetching issue of this consumer:',
            response.statusText
          );
        }
      } catch (error) {
        console.log('Error fetching issue of this consumer:', error);
      }
    };
    if (session?.user?.user_id) {
      fetchDevIssues(session.user.user_id);
    }
  }, [session]);
  return (
    <div className="mx-20 items-center flex flex-col">
      <h1 className="text-light-3 text-2xl mt-20 mb-10 font-semibold tracking-wide uppercase ">
        Your Issues
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

      {devIssues.map((issue) => {
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
      })}
    </div>
  );
};

export default DeveloperIssues;
