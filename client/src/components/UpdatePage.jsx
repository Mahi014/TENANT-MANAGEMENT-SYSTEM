import React,{useState} from 'react';
import { Link,useLocation} from 'react-router-dom';

const UpdatePage = () => {
    const location = useLocation();
    const { aadhar, name, phone_num, address, room_no, rent, gender, rent_paid } = location.state || {};
    const [nameState, setName] = useState(name);
    const [phone_numState, setPhoneNum] = useState(phone_num);
    const [addressState, setAddress] = useState(address);
    const [room_noState, setRoomNum] = useState(room_no);
    const [rentState, setRent] = useState(rent);
    const [genderState, setGender] = useState(gender);
    const [rent_paidState, setRentPaid] = useState(rent_paid);
    const [message, setMessage] = useState('Go to view page.');
    const [messageColour, setMessageColour] = useState(2);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const body = {nameState, phone_numState, addressState, room_noState, rentState, genderState, rent_paidState };
            const response = await fetch('http://localhost:5000/update/' + aadhar, {
                credentials: "include",
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),

            })
            const data = await response.json();
            if (response.ok && data.Success === "true") {
                setMessageColour(1);
                setMessage('Successful. Go to view page.')
            } else {
                setMessageColour(0);
                setMessage('An unexpected error occurred. Please try again later. Go to view page.')
            }

        }
        catch (err) {
            console.error(err.message);
            setMessage('An unexpected error occurred. Please try again later. Go to view page.')
            setMessageColour(0);
        }
    }

    return (
        <div className='container flex  flex-col  justify-center items-center w-screen h-screen bg-blue-500 text-white'>


            <h2 className='text-xl font-bold'>Update Tenant.</h2>

            <form onSubmit={handleSubmit} className='mt-4 border-2 border-white p-4 rounded-lg flex flex-col items-center space-y-4'>

                <div className='flex flex-row space-x-4'>

                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="aadhar">Aadhar:</label>
                        <input
                            type="text"
                            id="aadhar"
                            value={aadhar}
                            readOnly
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>

                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={nameState}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>
                </div>

                <div className='flex flex-row text-lg space-x-4'>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        type="text"
                        id="gender"
                        value={genderState}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                    > <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>

                    </select>
                </div>

                <div className='flex flex-row space-x-4'>
                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="phone_num">Phone Number:</label>
                        <input
                            type="number"
                            id="phone_num"
                            value={phone_numState}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            required
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>

                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={addressState}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>
                </div>


                <div className='flex flex-row space-x-4'>
                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="room_no">Room Number:</label>
                        <input
                            type="number"
                            id="room_no"
                            value={room_noState}
                            onChange={(e) => setRoomNum(e.target.value)}
                            required
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>

                    <div className='flex flex-col space-y-1 text-lg'>
                        <label htmlFor="rent">Rent:</label>
                        <input
                            type="number"
                            id="rent"
                            value={rentState}
                            onChange={(e) => setRent(e.target.value)}
                            required
                            className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                        />
                    </div>
                </div>

                <div className='flex flex-row text-lg space-x-4'>
                    <label htmlFor="rent_paid">Rent Paid:</label>
                    <select
                        type="text"
                        id="rent_paid"
                        value={rent_paidState}
                        onChange={(e) => setRentPaid(e.target.value)}
                        required
                        className='border-2 border-gray-200 rounded-lg text-black outline-blue-600'
                    > <option value="NO">NO</option>
                        <option value="YES">YES</option>
                    </select>
                </div>

                <button type='submit' className="m-1 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Update</button>

            </form>
            <Link
                to="/view"
                className={`mt-1 hover:underline hover:cursor-pointer text-sm font-bold ${messageColour === 1
                        ? "text-green-400" 
                        : messageColour === 0
                            ? "text-red-600" 
                            : "text-white"   
                    }`}
            >
                {message}
            </Link>
        </div>
    )
}

export default UpdatePage;