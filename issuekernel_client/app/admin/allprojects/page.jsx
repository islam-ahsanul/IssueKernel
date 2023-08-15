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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
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
              <span className="font-semibold text-base text-gray-700">
                Project Title
              </span>

              <input
                className="form_input"
                // value={post.tag}
                // onChange={(e) =>
                //   setPost({
                //     ...post,
                //     tag: e.target.value,
                //   })
                // }
                placeholder="#tag"
                required
              ></input>
            </label>

            <label>
              <span className=" font-semibold text-base text-gray-700">
                Project Description
              </span>

              <textarea
                className="form_textarea"
                // value={post.prompt}
                // onChange={(e) =>
                //   setPost({
                //     ...post,
                //     prompt: e.target.value,
                //   })
                // }
                placeholder="Write your prompt here..."
                required
              ></textarea>
            </label>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProjects;
