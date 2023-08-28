'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Managers = () => {
  const [managers, setManagers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/managers-with-projects',
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setManagers(data);
          console.log(data);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex text-white font-extrabold text-3xl justify-center pb-4">
        <h1 className="text-center">Managers</h1>
      </div>

      <div>
        {managers.map((mans) => (
          <article className="flex flex-row justify-between gap-4 rounded-2xl bg-gray-800/50 p-4 xs:flex-row xs:items-center m-1.5">
            <h3 className="text-lg font-semibold text-white basis-1/4 text-left">
              {mans.managerName}
            </h3>
            <h3 className="text-lg font-normal text-gray-500 text-left basis-1/4">
              {mans.managerEmail}
            </h3>
            <h3 className="text-lg font-normal text-gray-500 basis-1/2 text-right">
              {mans.projectName}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Managers;
