import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const ChangeManager = () => {
  const [availableManagers, setAvailableManagers] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchAvailableManagers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/projects/getmanager/availablemanagers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setAvailableManagers(data);
          console.log('⚡');
          console.log(data);
        } else {
          console.log(
            'Error fetching available managers:',
            response.statusText
          );
        }
      } catch (error) {
        console.log('Error fetching available managers:', error);
      }
    };

    fetchAvailableManagers();
  }, []);

  return (
    <div>
      <div>Hi</div>
      <div>
        {availableManagers.map((manager) => (
          <p>{manager.email}</p>
        ))}
      </div>
    </div>
  );
};

export default ChangeManager;
