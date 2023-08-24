import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const ChangeManagerModal = ({ onClose, projectId }) => {
  const [availableManagers, setAvailableManagers] = useState([]);
  const { data: session } = useSession();
  const modalRef = useRef(null);

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

  const handleRemoveManagerClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}/manager/remove`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Project manager removed:', response.statusText);
        onClose();
      } else {
        console.log('Error removing project manager:', response.statusText);
      }
    } catch (error) {
      console.log('Error removing project manager:', error);
    }
  };

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      document.addEventListener('mousedown', handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-blue-5/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div
        className="bg-dark-1 p-8 rounded-2xl shadow-md flex flex-col items-center"
        ref={modalRef}
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Select a Manager
        </h2>
        <ul>
          {availableManagers.map((manager) => (
            <li
              key={manager.user_id}
              className="cursor-pointer hover:bg-gray-900 p-2 rounded-2xl"
              onClick={() => handleManagerClick(manager)}
            >
              <div className="flex flex-row justify-between gap-28 px-3">
                <p className="text-left text-white tracking-wider">
                  {manager.full_name}
                </p>
                <p className="text-left text-light-3">{manager.email}</p>
              </div>
            </li>
          ))}
        </ul>
        <Button
          className="mt-10 bg_grad_primary rounded-2xl"
          onClick={handleRemoveManagerClick}
        >
          Remove Current Manager
        </Button>
      </div>
    </div>
  );
};

export default ChangeManagerModal;
