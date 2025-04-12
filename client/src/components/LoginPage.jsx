import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/status', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated) {
          navigate('/admin-dashboard');
        }
      } catch (err) {
        console.log('Error checking login status:', err);
      }
    };
    checkLogin();
  }, [navigate]);

  // Handle Google login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className='container flex flex-col justify-center items-center w-screen h-screen bg-blue-500 text-white'>
      <div className='border-2 border-white p-8 rounded-lg flex flex-col items-center space-y-4'>
        <h2 className='text-3xl font-bold'>Login</h2>
        
        <p className='text-lg'>Sign in with Google</p>
        
        <button 
          onClick={handleGoogleLogin}
          className="m-1 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <img 
            src="/images/googlelogo.png" 
            alt="Google logo" 
            className="w-5 h-5 mr-2"
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;