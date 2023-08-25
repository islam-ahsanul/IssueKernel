import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const PostIssueModal = ({ onClose, projectId }) => {
  const { data: session } = useSession();
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/issues/${projectId}?consumerId=${session?.user.user_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
          }),
        }
      );

      if (response.ok) {
        onClose();
        console.log('Issue Posted 💡🌳');
      }
    } catch (error) {
      console.log('errrrrr in page');
      console.log(error);
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
        className="bg-dark-1 p-8 rounded-2xl shadow-md flex flex-col items-center border border-slate-700 "
        ref={modalRef}
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Submit an Issue
        </h2>
        <form className="flex flex-col gap-7 w-[450px]" onSubmit={handleSubmit}>
          <label>
            <span className="font-semibold text-base text-white">
              Issue Title
            </span>

            <input
              className="w-full flex rounded-xl mt-2 p-3 text-base text-gray-400 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
              type="text"
              id="project_name"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="Enter Project Title"
              required
            ></input>
          </label>

          <label>
            <span className=" font-semibold text-base text-white">
              Issue Description
            </span>

            <textarea
              className="w-full flex rounded-xl h-[200px] mt-2 p-3 text-sm text-gray-400 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
              id="project_desc"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Write project description here..."
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg_grad_primary rounded-xl text-white tracking-wide mx-32 py-2"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostIssueModal;
