import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const SignedLanding = () => {
  const { data: session } = useSession();
  const [account, setAccout] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/email/${email}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${session?.user.accessToken}`,
              // Authorization: email,
            },
          }
        );

        if (response.status === 200) {
          const userInfo = await response.json();
          // User info from token
          console.log('User Info:', userInfo);
          console.log(userInfo.role);
          setAccout(userInfo);
        } else {
          console.log('Error fetching user information:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };
    fetchUserInfo(session?.user.email);
  }, []);

  return (
    <>
      <section className="flex-center flex-col paddings mt-15 mx-20">
        <h1 className="font-extrabold text-5xl text-black tracking-wide text-left purple_gradient">
          Welcome, {account.full_name}
          Your ID: {account.user_id}
          Your Email: {account.email}
        </h1>
        <div className=" text-white mt-14 font-semibold text-2xl text-center max-w-xl align-middle">
          You are signed in as {account.role}
        </div>
        <Link
          href={`/${session?.user.role.toLowerCase()}/dashboard`}
          className="bg-violet-900 px-5 py-2 text-2xl text-center rounded-full text-white font-nunito m-6 font-normal hover:bg-transparent hover:text-violet-900 border border-violet-900 transition-transform hover:scale-110 motion-reduce:transform-none"
        >
          Go to Dashboard
        </Link>
      </section>
    </>
  );
};

export default SignedLanding;
