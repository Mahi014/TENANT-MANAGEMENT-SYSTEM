import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();

      if (response.ok && data.Admin === "true") {
        console.log('Login successful as Admin');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid credentials or not an admin');
      }
    } catch (err) {
      console.error('Error during login:', err.message);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='container flex  flex-col  justify-center items-center w-screen h-screen bg-blue-500 text-white'>
      <form onSubmit={handleSubmit} className='border-2 border-white p-8 rounded-lg flex flex-col items-center space-y-4'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <div className='flex flex-col space-y-1 text-lg'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
          />
        </div>

        <div className='flex flex-col space-y-1 text-lg'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
          />
        </div>

        {error && <p className='text-red-600 text-sm'>{error}</p>}

        <button type='submit' className="m-1 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Login</button>

      </form>
    </div>
  );
};

export default LoginPage;