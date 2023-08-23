'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const DevsOfProject = ({ projectId }) => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devsOfProject, setDevsOfProject] = useState([]);

  useEffect(() => {
    const fetchDevsOfProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/developer-projects/${projectId}/developers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setDevsOfProject(data);
          console.log('🦖');
          console.log(data);
        } else {
          console.log('Error fetching Devs of Project:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching Devs of Project:', error);
      }
    };

    fetchDevsOfProject();
  }, [isModalOpen]);

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
      {devsOfProject.map((devs) => (
        <p className="text-white">{devs.full_name}</p>
      ))}
    </div>
  );
};

export default DevsOfProject;

//* The Modal !
const AddDevModal = ({ onClose, projectId }) => {
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const { data: session } = useSession();
  const modalRef = useRef(null);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);

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
            'Error fetching available developers:',
            response.statusText
          );
        }
      } catch (error) {
        console.log('Error fetching available developers:', error);
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

  const handleDevClick = (developer) => {
    const isSelected = selectedDevelopers.some(
      (dev) => dev.user_id === developer.user_id
    );

    if (isSelected) {
      setSelectedDevelopers(
        selectedDevelopers.filter((dev) => dev.user_id !== developer.user_id)
      );
    } else {
      setSelectedDevelopers([...selectedDevelopers, developer]);
    }
  };

  const assignDevelopersToProject = async () => {
    try {
      const developerIds = selectedDevelopers
        .map((dev) => dev.user_id)
        .join(',');
      const response = await fetch(
        `http://localhost:8080/api/developer-projects/assign?developerIds=${developerIds}&projectId=${projectId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Developers assigned to project successfully');
        onClose();
      } else {
        console.log(
          'Error assigning developers to project:',
          response.statusText
        );
      }
    } catch (error) {
      console.log('Error assigning developers to project:', error);
    }
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-white p-8 rounded-md shadow-md" ref={modalRef}>
    //     <h2 className="text-xl font-semibold mb-4">Select Developers</h2>
    //     <ul>
    //       {availableDevelopers.map((devs) => (
    //         <li
    //           key={devs.user_id}
    //           className="cursor-pointer hover:bg-gray-100 p-2 rounded"
    //           onClick={() => handleDevClick(devs)}
    //         >
    //           {devs.email}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md" ref={modalRef}>
        <h2 className="text-xl font-semibold mb-4">Select Developers</h2>
        <div className="flex flex-wrap gap-2">
          {selectedDevelopers.map((dev) => (
            <div
              key={dev.user_id}
              className="bg-blue text-black px-2 py-1 rounded"
            >
              {dev.email}
            </div>
          ))}
        </div>
        <select
          multiple
          className="w-full border rounded p-2 mt-4"
          onChange={(e) =>
            handleDevClick(
              availableDevelopers.find(
                (dev) => dev.user_id === parseInt(e.target.value)
              )
            )
          }
        >
          <option value="" disabled>
            Select developers...
          </option>
          {availableDevelopers.map((dev) => (
            <option key={dev.user_id} value={dev.user_id}>
              {dev.email}
            </option>
          ))}
        </select>
        <button
          className="mt-4 bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={assignDevelopersToProject}
        >
          Assign Developers
        </button>
      </div>
    </div>
  );
};
