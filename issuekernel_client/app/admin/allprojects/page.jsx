'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AllProjects = () => {
  const handleSubmit = () => {};

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-end ">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-dark-1 text-white">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription className="text-light-3">
              Enter project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* Form Start */}
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            {/*<div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>*/}

            {/* Form end */}

            <label>
              <span className="font-semibold text-base text-white">
                Project Title
              </span>

              <input
                className="w-full flex rounded-xl mt-2 p-3 text-base text-gray-800 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
                // value={post.tag}
                // onChange={(e) =>
                //   setPost({
                //     ...post,
                //     tag: e.target.value,
                //   })
                // }
                placeholder="Enter Project Title"
                required
              ></input>
            </label>

            <label>
              <span className=" font-semibold text-base text-white">
                Project Description
              </span>

              <textarea
                className="w-full flex rounded-xl h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 bg-gray-800/30"
                // value={post.prompt}
                // onChange={(e) =>
                //   setPost({
                //     ...post,
                //     prompt: e.target.value,
                //   })
                // }
                placeholder="Write project description here..."
                required
              ></textarea>
            </label>

            <DialogFooter>
              <Button type="submit" className="bg-primary-500">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProjects;
