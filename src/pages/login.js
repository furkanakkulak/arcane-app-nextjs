import axios from 'axios';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '@/context/ContextProvider';

const Login = () => {
  const router = useRouter();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { login } = useContext(AppContext);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    setError(null);
    setMessage(null);
    axios
      .post('https://dummyjson.com/auth/login', payload)
      .then(({ data }) => {
        login(data);
        setMessage(`Login as ${data.username}, you are being redirected`);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch((err) => {
        setError('Not a valid account');
      });
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-800 px-5">
      <form
        onSubmit={onSubmit}
        className="py-7 px-10 flex flex-col gap-5 bg-white rounded-xl w-full sm:w-1/2 lg:w-1/3"
      >
        <h1 className="text-center tracking-wide font-extrabold text-5xl text-indigo-700 rounded-xl">
          ARCANE
        </h1>
        <h1 className="text-xl text-center">Login into your account</h1>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400">
            <p>{error}</p>
          </div>
        )}
        {message && (
          <div className="p-4 mb-4 text-sm text-indigo-800 rounded-lg bg-indigo-50 dark:text-indigo-400">
            <p>{message}</p>
          </div>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="rounded-xl px-5 py-2.5 border-2 border-indigo-700"
          ref={usernameRef}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-xl px-5 py-2.5 border-2 border-indigo-700"
          ref={passwordRef}
        />
        <button className="py-2 px-3 font-semibold text-white bg-indigo-700 rounded-xl">
          Login
        </button>
        <p className="text-center">
          Not Registered?{' '}
          <Link
            href="/signup"
            className="text-indigo-700"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
