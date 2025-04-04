import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { doCreateUserWithEmailAndPassword } from '../../auth';

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (err) {
        setErrorMessage(err.message);
        setIsRegistering(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
        <div className="text-center mb-6">
          <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
            Create a New Account
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-bold">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm transition duration-300"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-bold">Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm transition duration-300"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm transition duration-300"
            />
          </div>
          {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full px-4 py-2 font-medium rounded-lg text-white ${
              isRegistering
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'
            }`}
          >
            {isRegistering ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="hover:underline font-bold">
              Continue
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;