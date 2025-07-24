import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginApp } from '../store/actions/ActionLogin';

import type { Dispatch, SetStateAction } from 'react';

type Page = 'login' | 'dashboard' | 'members' | 'transactions' | 'goals' | 'settings';
interface LoginProps {
  setCurrentPage?: Dispatch<SetStateAction<Page>>;
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginStatus = useSelector((state: any) => state.loginReducer.status);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        
      await dispatch<any>(loginApp(email, password));
      // Optionally, check login status from redux and redirect
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (loginStatus === 200) {
      if (setCurrentPage) setCurrentPage('dashboard');
    } else if (loginStatus === 'failed') {
      setError('Usuario o contraseña incorrectos.');
    }
  }, [loginStatus, setCurrentPage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
