'use client';
import UserCard from '@/components/UserCard';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AllUsers = () => {
  const [usersAll, setUsersAll] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAllUsrs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${session?.user.accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUsersAll(data);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };
    fetchAllUsrs();
  }, []);

  return (
    <div>
      <div className="flex text-white font-extrabold text-3xl justify-center pb-4">
        <h1 className="text-center">All Users</h1>
      </div>

      <div>
        {usersAll.map((user) => (
          <UserCard
            key={user.user_id}
            id={user.user_id}
            name={user.full_name}
            email={user.email}
            role={user.role}
          />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
