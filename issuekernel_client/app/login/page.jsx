'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        // Login successful
        const data = await response.text();
        localStorage.setItem('token', data);
        console.log('Login success:', data);
        // You can handle successful login, redirect the user, etc.
        // fetchUserInfo(data);
        router.push('/');
      } else if (response.status === 401) {
        console.log('Invalid credentials');
        // Show an error message to the user, for example:
        // setError('Invalid email or password');
      } else {
        // Handle other error scenarios (e.g., server errors)
        console.log('Unexpected error:', response.statusText);
        // Show a generic error message to the user, for example:
        // setError('An unexpected error occurred');
      }
    } catch (error) {
      console.log('errrr login');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  //~ Fetch User block
  // const fetchUserInfo = async (token) => {
  //   try {
  //     const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //     const email = decodedToken.email;

  //     const response = await fetch(
  //       `http://localhost:8080/api/users/email/${email}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const userInfo = await response.json();
  //       // User info from token
  //       console.log('User Info:', userInfo);
  //     } else {
  //       console.log('Error fetching user information:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching user information:', error);
  //   }
  // };

  return (
    <div className="flex flex-col w-full max-w-full justify-center items-center h-screen ">
      {/* will move the gradient div to root later */}
      <div className="main">
        <div className="gradient"></div>
      </div>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <h1 className="head_text text-center">
          <span className="blue_gradient">Login</span>
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
          className="font-nunito w-full bg-black text-white py-2 px-4 rounded-full hover:bg-indigo-600"
        >
          {submitting ? 'Loging in...' : 'Login'}
        </button>
        <p className="flex gap-1 justify-center font-nunito">
          Don't have account? Please{' '}
          <Link
            href="/register"
            className="text-black font-extrabold hover:underline hover:text-sky-600"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
