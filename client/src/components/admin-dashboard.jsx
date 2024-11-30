import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
      <div className='container flex  flex-col  justify-center items-center w-screen h-screen bg-blue-500 text-white'>
        <h1 className='text-3xl'>Welcome Admin</h1>
        <div className='flex mt-4'>
        <button  className="m-1 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Create</button>
        <button  className="m-1 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">View</button>
        </div>
      </div>
    );
  };

export default AdminDashboard;