import React from 'react';
import Link from 'next/link';

const VisitorLanding = () => {
  return (
    <>
      <section className="flex-center flex-col paddings mt-15 mx-20">
        <h1 className="font-mono font-extrabold text-5xl text-black tracking-wide text-left purple_gradient">
          Step into a world of organized projects and efficient issue resolution
          with IssueKernel.
        </h1>
        <div className=" font-nunito mt-14 font-semibold text-2xl text-center max-w-xl align-middle">
          Harmonizes user experiences and developer expertise, a fusion that
          powers effective solutions.
        </div>
        <Link
          href="/register"
          className="bg-black hover:shadow-xl hover:shadow-violet-500/50 px-14 py-2 text-2xl text-center rounded-full text-white font-nunito m-6 font-normal hover:bg-transparent hover:text-violet-900 hover:font-extrabold transition-transform hover:scale-110 motion-reduce:transform-none border hover:border-violet-900 hover:border-2"
        >
          Create Account
        </Link>
      </section>
    </>
  );
};

export default VisitorLanding;
