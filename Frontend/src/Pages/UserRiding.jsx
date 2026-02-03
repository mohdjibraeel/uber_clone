import React from "react";
import { Link } from "react-router-dom";

const UserRiding = () => {
  return (
    <div className="h-screen relative">
      <Link to="/home">
        <img
          className="w-20 absolute top-2 left-2 "
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt=""
        />
      </Link>
      <Link
        to="/home"
        className="fixed bg-white pb-2 px-2 pt-1.5 rounded-full h-10 w-10 items-center text-center right-2 top-4"
      >
        <i className=" text-xl font-medium ri-home-6-line "></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-center justify-between w-full p-3 rounded-xl">
          <img
            className="h-16 -ml-1"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt=""
          />
          <div className="text-right">
            <h2 className="font-medium">Captain</h2>
            <h3 className="font-bold">RJ 04 SE 8277</h3>
            <p className="text-sm text-gray-600">Car Model</p>
          </div>
        </div>
        <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
          <div>
            <i className="text-2xl ri-map-pin-fill"></i>
          </div>
          <div>
            <h3 className="font-medium text-lg">H14/64-D</h3>
            <p className="text-sm text-gray-700">MNIT Jaipur</p>
          </div>
        </div>
        <div className="w-full flex gap-3 items-center py-3 px-2">
          <div>
            <i className="text-2xl ri-cash-line"></i>
          </div>
          <div>
            <h3 className="font-medium text-lg">₹ 193.20</h3>
            <p className="text-sm text-gray-700">Payment Cash</p>
          </div>
        </div>
        <div>
          <button className="w-full bg-green-600 text-white p-3 text-xl font-medium mt-3 rounded-lg">
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRiding;
