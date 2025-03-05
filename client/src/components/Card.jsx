import React from 'react';
import { Link } from 'react-router-dom'
import UpdatePage from './UpdatePage';

const Card=(props)=>{
    return (
        <div className="container flex flex-col border border-gray-300/40 bg-white/10 backdrop-blur-md shadow-xl shadow-white/10 rounded-2xl w-80 p-6 gap-3 text-gray-100">
          
          <div className="grid grid-cols-2 gap-2 text-lg font-medium">
            <p className="opacity-80">Aadhar No.:</p>
            <p className="text-right font-light">{props.aadhar}</p>
      
            <p className="opacity-80">Name:</p>
            <p className="text-right font-light">{props.name}</p>
      
            <p className="opacity-80">Gender:</p>
            <p className="text-right font-light">{props.gender}</p>
      
            <p className="opacity-80">Room No.:</p>
            <p className="text-right font-light">{props.room_no}</p>
      
            <p className="opacity-80">Rent:</p>
            <p className="text-right font-light">₹{props.rent}</p>
      
            <p className="opacity-80">Rent Paid:</p>
            <p className="text-right font-light">{props.rent_paid}</p>
      
            <p className="opacity-80">Mobile No.:</p>
            <p className="text-right font-light">{props.phone_num}</p>
          </div>
      
          <p className="text-lg opacity-80 mt-2">Address:</p>
          <p className="text-sm font-light break-words">
            {props.address}
          </p>
      
      
          <div className="flex justify-between mt-4">
            <Link 
                  to="/update"
                  state= {{
                      aadhar: props.aadhar,
                      name: props.name,
                      phone_num: props.phone_num,
                      address: props.address,
                      room_no: props.room_no,
                      rent: props.rent,
                      gender: props.gender,
                      rent_paid: props.rent_paid
                  }}
              className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
              Update
            </Link>
      
            <button type="button" className="bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Remove
            </button>
          </div>
      
        </div>
      );
        
}

export default Card;