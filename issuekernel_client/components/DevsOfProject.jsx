'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const DevsOfProject = ({ projectId }) => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col bg-gray-800/50 mt-2 mb-2 rounded-3xl">
      <div className="flex flex-row">
        <p className="pt-4 pb-1 px-4 text-light-3 tracking-wider">DEVELOPERS</p>
        <button
          className="bg-blue-500 hover:bg-blue text-white px-4 py-2 rounded"
          onClick={openModal}
        >
          Add Developers
        </button>
        {isModalOpen && (
          <AddDevModal onClose={closeModal} projectId={projectId} />
        )}
      </div>
      // list of devs will be here
    </div>
  );
};

export default DevsOfProject;

const AddDevModal = ({ onClose, projectId }) => {
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const { data: session } = useSession();
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchAvailableDevelopers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/available-developers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setAvailableDevelopers(data);
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

    fetchAvailableDevelopers();
  }, []);

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md" ref={modalRef}>
        <h2 className="text-xl font-semibold mb-4">Select Developers</h2>
        <ul>
          {availableDevelopers.map((devs) => (
            <li
              key={devs.user_id}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              //   onClick={() => handleManagerClick(manager)}
            >
              {devs.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
