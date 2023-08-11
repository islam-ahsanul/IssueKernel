'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const createAccount = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullname,
          email: formData.email,
          password_hash: formData.password,
        }),
      });
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.log('errrrrr in page');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-full justify-center items-center h-screen ">
      {/* <div className="main">
        <div className="gradient"></div>
      </div> */}
      <form
        onSubmit={createAccount}
        className="w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <h1 className="head_text text-center">
          <span className="text-sky-500">Create Account</span>
        </h1>
        <div className="mb-1">
          <label
            htmlFor="fullname"
            className="block font-nunito font-semibold text-gray-700 ml-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullname: e.target.value,
              })
            }
            className="form_input"
            placeholder="Enter your email"
            required
          />
        </div>
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
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
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
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="form_input"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className="font-nunito w-full bg-black text-white py-2 px-4 rounded-full hover:bg-sky-500"
        >
          {submitting ? 'Creating Accout...' : 'Create Account'}
        </button>
        <p className="flex gap-1 justify-center font-nunito">
          Already have an account? Please{' '}
          <Link
            href="/login"
            className="text-black font-extrabold hover:underline hover:text-sky-500 transition-all hover:translate-x-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
