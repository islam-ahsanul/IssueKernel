import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';

export default function Home() {
  return (
    // <section className="w-full flex-center flex-col m-15">
    //   <h1 className="head_text text-center">
    //     <span className="orange_gradient text-center">Welcome</span>
    //   </h1>
    // </section>
    <>
      <LandingNavbar />
      <section className="flex-center flex-col paddings m-15">
        <h1>Intro Text</h1>
        <h2>Login State</h2>
        <h2>Login req</h2>
        <h2>or</h2>
        <h2>Signup req</h2>
      </section>
    </>
  );
}
