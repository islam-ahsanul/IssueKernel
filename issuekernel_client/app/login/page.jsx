'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

const Login = ({ searchParams }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  //* NEW !

  // if (session) {
  //   router.replace('/');
  //   return null;
  // }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Call the API to authenticate the user
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });

      // Handle the result (you can add error handling here)
      if (result?.error) {
        console.error('Sign-in error:', result.error);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full max-w-full justify-center items-center h-screen ">
      {/* <div className="main">
        <div className="gradient"></div>
      </div> */}

      <form
        onSubmit={handleSignIn}
        className="w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {searchParams?.message && <p>{searchParams?.message}</p>}
        <h1 className="head_text text-center">
          <span className="text-sky-500">Login</span>
        </h1>
        <div className="mb-1">
          <label
            htmlFor="email"
            className="block font-nunito font-semibold text-gray-700 ml-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form_input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block font-nunito font-semibold text-gray-700 ml-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form_input"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className="font-nunito w-full bg-black text-white py-2 px-4 rounded-full hover:bg-sky-500"
        >
          {submitting ? 'Loging in...' : 'Login'}
        </button>
        <p className="flex gap-1 justify-center font-nunito">
          Don't have account? Please{' '}
          <Link
            href="/register"
            className="text-black font-extrabold hover:underline hover:text-sky-600 transition-all hover:translate-x-1"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
