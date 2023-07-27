'use client';
import { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your Spring Boot backend's authentication API here with the email and password
    // Example API call:
    // fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   // Handle the response from the backend here (e.g., set authentication tokens, redirect, etc.)
    // })
    // .catch((error) => {
    //   // Handle any errors from the API call here
    // });
  };

  return (
    <div className="flex flex-col w-full max-w-full justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <h1 className="head_text text-center">
          <span className="blue_gradient">Login</span>
        </h1>
        <div className="mb-1">
          <label
            htmlFor="email"
            className="block font-satoshi font-semibold text-gray-700 ml-1"
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
            className="block font-satoshi font-semibold text-gray-700 ml-1"
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
          className="font-satoshi w-full bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
        >
          Log In
        </button>
        <p className="flex gap-1 justify-center">
          Don't have account? Please{' '}
          <Link
            href="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
