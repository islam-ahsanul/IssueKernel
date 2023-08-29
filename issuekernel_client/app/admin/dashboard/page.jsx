'use client';
import UserCard from '@/components/UserCard';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AdminDashboard = () => {
  const [userCountsByRole, setUserCountsByRole] = useState({});
  const [totalUserCount, setTotalUserCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserCountsByRole = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/user-counts-by-role',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUserCountsByRole(data);
          console.log(data);
        } else {
          console.log(
            'Error fetching user counts by role:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchTotalUserCount = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/total-user-count',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTotalUserCount(data);
          console.log(data);
        } else {
          console.log('Error fetching total user count:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchUserCountsByRole();
    fetchTotalUserCount();
  }, []);
  return <h1 className="head-text_new">AdminDashboard</h1>;
};

export default AdminDashboard;
