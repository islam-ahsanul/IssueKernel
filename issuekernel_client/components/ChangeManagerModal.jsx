import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const ChangeManagerModal = ({ onClose, projectId }) => {
  const [availableManagers, setAvailableManagers] = useState([]);
  const { data: session } = useSession();

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

  const handleManagerClick = async (manager) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}/manager?managerId=${manager.user_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Successfully updated the project's manager
        console.log('Project manager updated:', response.statusText);
        onClose(); // Close the modal or perform any other action
      } else {
        console.log('Error updating project manager:', response.statusText);
      }
    } catch (error) {
      console.log('Error updating project manager:', error);
    }
    // console.log('Selected Manager:', manager.full_name);
    // onClose();
  };

  return (
    // <div>
    //   <div>Hi</div>
    //   <div>
    //     {availableManagers.map((manager) => (
    //       <p>{manager.email}</p>
    //     ))}
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select a Manager</h2>
        <ul>
          {availableManagers.map((manager) => (
            <li
              key={manager.user_id}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleManagerClick(manager)}
            >
              {manager.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChangeManagerModal;