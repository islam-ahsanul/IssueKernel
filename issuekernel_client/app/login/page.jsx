'use client';
import { useState } from 'react';

// const login = () => {
//   return (
//     <section className="w-full flex-center flex-col m-15">
//       <h1 className="head_text text-center">
//         <span className="black_gradient text-center ">Log In</span>
//       </h1>
//       <div>Login form placeholder</div>
//       <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
//         Announcing our next round of funding.{' '}
//         <a href="#" class="font-semibold text-indigo-600">
//           <span class="absolute inset-0" aria-hidden="true"></span>Read more{' '}
//           <span aria-hidden="true">&rarr;</span>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default login;

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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
