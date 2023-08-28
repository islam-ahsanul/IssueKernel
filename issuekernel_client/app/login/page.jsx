'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

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
        redirect: false,
        callbackUrl: '/',
      });

      if (result?.error) {
        console.error('Sign-in error:', result.error);
        // alert('Wrogn Credentials');
        toast.error('Login failed! Wrong email or password. ');
      } else if (result?.url) {
        router.push(result.url);
        toast.success('Login Successfull!');
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
        className="w-full max-w-2xl flex flex-col gap-7 px-10 py-8 border border-slate-700 bg-gray-800/30 rounded-3xl"
      >
        {searchParams?.message && <p>{searchParams?.message}</p>}
        <h1 className="head_text text-center">
          <span className="fg_grad_primary">Login</span>
        </h1>
        <div className="mb-1">
          <label
            htmlFor="email"
            className="block font-nunito font-semibold text-white ml-1"
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
            className="block font-nunito font-semibold text-white ml-1"
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
          className="font-nunito w-full bg-white text-dark-1 py-2 px-4 rounded-full hover:bg_grad_primary hover:text-white"
        >
          {submitting ? 'Loging in...' : 'Login'}
        </button>
        <p className="flex text-gray-400 gap-1 justify-center font-nunito">
          Don't have account? Please{' '}
          <Link
            href="/register"
            className="text-white font-extrabold hover:underline hover:text-primary-500 transition-all hover:translate-x-1"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
