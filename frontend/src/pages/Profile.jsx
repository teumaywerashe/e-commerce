import React from "react";
import {useNavigate} from 'react-router-dom'
import MyOrders from "./MyOrders";

function Profile() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow container mx-auto p-4 md:p-6 ">
        <div
          className="flex flex-col md:flex-row md:space-x-6 spcae-y-6 md:space-y-0
        "
        >
          <div className="w-full md:w-1/3 shadow-md lg:w-1/4 rounded-lg p-6 ">
            <h1 className="text-2xl md:text-2xl  font-bold mb-4 ">Jhon Doe</h1>
            <p className="text-lg text-gray-600 mb-4">John@gmail.com</p>
            <button onClick={()=>navigate('/login')} className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer">
              Logout
            </button>
          </div>
          <div className="s-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
      profile
    </div>
  );
}

export default Profile;
