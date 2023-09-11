'use client';
import UserCard from '@/components/UserCard';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AllUsers = () => {
  const [usersAll, setUsersAll] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAllUsers = async () => {
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
        console.error('Error fetching users:', error);
      }
    };
    fetchAllUsers();
  }, []);

  // Filter the users based on the search query
  // const filteredUsers = usersAll.filter((user) =>
  //   user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filtereUsers = (searchText) => {
    const regex = new RegExp(searchText, 'i');

    return usersAll.filter(
      (item) =>
        regex.test(item.full_name) ||
        regex.test(item.email) ||
        regex.test(item.role)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filtereUsers(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div>
      <div className="flex text-white font-extrabold text-3xl justify-center pb-4">
        <h1 className="text-center">All Users</h1>
      </div>

      <form className="relative w-full flex-center">
        <input
          className="block w-[500px] rounded-full bg-gray-800 mb-3 py-2.5 pl-5 pr-12 text-sm text-white shadow-lg font-medium border border-black focus:border-gray-500 focus:outline-none focus:ring-0 peer"
          type="text"
          placeholder="Search by name, email or role"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      {searchText ? (
        <div>
          {searchedResults.map((user) => (
            <UserCard
              key={user.user_id}
              id={user.user_id}
              name={user.full_name}
              email={user.email}
              role={user.role}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AllUsers;
