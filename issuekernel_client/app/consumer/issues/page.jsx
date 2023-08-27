'use client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const IssueHistory = () => {
  const { data: session } = useSession();
  const [consumerIssues, setConsumerIssues] = useState([]);

  useEffect(() => {
    const fetchConsumerIssues = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/issues/consumer/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log(consumerIssues);
          setConsumerIssues(data);
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
      fetchConsumerIssues(session.user.user_id);
    }
  }, [session]);
  return (
    <div>
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
    </div>
  );
};

export default IssueHistory;
