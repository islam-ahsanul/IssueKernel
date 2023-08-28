import React from 'react';
import Link from 'next/link';

const VisitorLanding = () => {
  return (
    <>
      <section className="flex-center flex-col paddings mt-24 mx-20">
        <h1 className="font-extrabold text-5xl text-black tracking-wide text-left purple_gradient">
          Step into a world of organized projects and efficient issue resolution
          with IssueKernel.
        </h1>
        <div className=" text-white mt-14 font-semibold text-2xl text-center max-w-xl align-middle">
          Harmonizes user experiences and developer expertise, a fusion that
          powers effective solutions.
        </div>
        <Link
          href="/register"
          className="bg-black px-14 py-2 text-2xl text-center rounded-2xl font-nunito m-6 font-normal hover:font-extrabold hover:bg-gray-800/50 text-violet-500 tracking-wider border border-gray-800"
        >
          Create Account
        </Link>
      </section>
    </>
  );
};

export default VisitorLanding;
