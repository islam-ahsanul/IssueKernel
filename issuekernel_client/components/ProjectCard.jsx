import Link from 'next/link';

const ProjectCard = ({ id, title, desc, path }) => {
  return (
    <div className="col-span-3  lg:col-span-1 ">
      <div className="flex flex-col bg-gray-800/70 h-[250px] overflow-hidden relative rounded-3xl">
        <div className="flex-grow">
          <h1 className="px-4 pt-3 mb-4 text-white font-bold text-xl tracking-widest ">
            {title}
          </h1>
          <p className="px-4 mb-3 text-gray-500 relative z-10 tracking-wider font-semibold">
            {desc}
          </p>
        </div>
        <div className="flex justify-center items-center p-4 absolute bottom-0 left-0 right-0 bg-transparent z-20">
          <Link
            href={path}
            className="bg_grad_primary py-1 px-7 text-center rounded-xl text-white shadow-xl shadow-black"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
