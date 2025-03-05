import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Card from "./Card";

const ViewPage = () => {
  const [tenants, setTenant] = useState([]);

  const getTenant = async () => {
    try {
      const response = await fetch("http://localhost:5000/view");
      const jsonData = await response.json();
      setTenant(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTenant();
  }, []);
  return (
    <div className="container mx-auto min-h-screen bg-blue-500 text-white p-4">

      <div className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg text-white py-4 px-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tenant Details</h1>
          <Link 
            to="/create" 
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition duration-300"
          >
            ➕ Add Tenant
          </Link>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {tenants.map((tenantItem) => (
          <Card
            key={tenantItem.aadhar}
            aadhar={tenantItem.aadhar}
            address={tenantItem.address}
            gender={tenantItem.gender}
            name={tenantItem.name}
            phone_num={tenantItem.phone_num}
            rent={tenantItem.rent}
            rent_paid={tenantItem.rent_paid}
            room_no={tenantItem.room_no}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewPage;
