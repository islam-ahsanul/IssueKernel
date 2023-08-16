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
          <div>
            {devs.developerName} --{' '}
            {devs.projectTitle || 'Not assigned to any project'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
