import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className='container flex  flex-col  justify-center items-center w-screen h-screen bg-blue-500 text-white'>
      <h1 className='text-4xl m-1' >Welcome to Reside Inn PG</h1>
      <p className='text-xl m-1' >Your home away from home.</p>
      <Link to="/login" className="m-1 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Go to Login Page</Link>
    </div>
  );
};

export default LandingPage;
