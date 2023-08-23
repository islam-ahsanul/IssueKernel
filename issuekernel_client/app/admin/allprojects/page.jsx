'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';

const AllProjects = () => {
  const { data: session } = useSession();

  //* Fetch All Projects !

  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchAllUsrs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${session?.user.accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setAllProjects(data);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };
    fetchAllUsrs();
  }, []);

  //* Form Logic !

  const router = useRouter();

  const [formData, setFormData] = useState({
    project_name: '',
    project_desc: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          project_name: formData.project_name,
          project_desc: formData.project_desc,
        }),
      });

      if (response.ok) {
        console.log('Project Created 💡🌳');
        router.refresh();
      }
    } catch (error) {
      console.log('errrrrr in page');
      console.log(error);
    }
  };
  //* Form Logic End!

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-end ">
            {/* <Button variant="outline">Create a New Project</Button> */}
            <div className="flex gap-1 cursor-pointer bg_grad_primary p-2 rounded-xl">
              <Image src="/create.svg" height={24} width={24} />
              <p className="text-white">Create a new project</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-dark-1 text-white">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription className="text-light-3">
              Enter project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            <label>
              <span className="font-semibold text-base text-white">
                Project Title
              </span>

              <input
                className="w-full flex rounded-xl mt-2 p-3 text-base text-gray-400 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
                type="text"
                id="project_name"
                value={formData.project_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    project_name: e.target.value,
                  })
                }
                placeholder="Enter Project Title"
                required
              ></input>
            </label>

            <label>
              <span className=" font-semibold text-base text-white">
                Project Description
              </span>

              <textarea
                className="w-full flex rounded-xl h-[200px] mt-2 p-3 text-sm text-gray-400 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
                id="project_desc"
                value={formData.project_desc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    project_desc: e.target.value,
                  })
                }
                placeholder="Write project description here..."
                required
              ></textarea>
            </label>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" className="bg_grad_primary">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="my-24 mx-14 rounded-md grid grid-cols-3 gap-12">
        {allProjects.map((project) => (
          <ProjectCard
            key={project.project_id}
            id={project.project_id}
            title={project.project_name}
            desc={project.project_desc}
            path={`/admin/allprojects/${project.project_id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
