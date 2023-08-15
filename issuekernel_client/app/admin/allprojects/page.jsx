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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AllProjects = () => {
  const { data: session } = useSession();
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
        router.push('/admin/allprojects');
      }
    } catch (error) {
      console.log('errrrrr in page');
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-end ">
            {/* <Button variant="outline">Create a New Project</Button> */}
            <div className="flex gap-1 cursor-pointer bg-primary-500 p-2 rounded-xl">
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
                <Button type="submit" className="bg-primary-500">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProjects;
