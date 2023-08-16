'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/developers-with-projects',
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setDevelopers(data);
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
        <h1 className="text-center">Developers</h1>
      </div>

      <div>
        {developers.map((devs) => (
          <article className="flex flex-row justify-between gap-4 rounded-2xl bg-gray-800/50 p-4 xs:flex-row xs:items-center m-1.5">
            <h3 className="text-lg font-semibold text-white basis-1/4 text-left">
              {devs.developerName}
            </h3>
            <h3 className="text-lg font-normal text-gray-500 text-left basis-1/4">
              {devs.developerEmail}
            </h3>
            <h3 className="text-lg font-normal text-gray-500 basis-1/2 text-right">
              {devs.projectTitle
                ? `Assigned to ${devs.projectTitle}`
                : 'Not assigned to any project'}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Developers;
