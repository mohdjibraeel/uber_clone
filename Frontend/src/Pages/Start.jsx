import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="h-screen py-4 px-5 bg-[#2f73f2] flex flex-col items-center justify-between ">
        <div className="text-center items-center flex flex-col mt-9">
          <img
            className="h-20 "
            src="https://media.ffycdn.net/us/postmates/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC8xN1wvNTUxMFwvMmM3MTkyZDM1NGQ0YjA2YWFhZTgzZDc5Yzc2MzYwNWMtMTYyMDM3Nzc0OC5haSJ9:postmates:cvkkT2vHrzRiGiujqpqbVFn9z8dn773yTgVOCePXowk?width=2400"
            alt="logo"
          />
          <img
            className=" mt-4"
            src="https://blog.uber-cdn.com/cdn-cgi/image/width=1024,quality=80,onerror=redirect,format=auto/wp-content/uploads/2020/05/Driver_Rider_Mask.png"
            alt="Safety"
          />
          <h1 className="text-white text-[35px] font-semibold mt-1">
            Welcome to Uber
          </h1>
          <p className="text-white text-[22px] font-[400px]">
            Move with Safety
          </p>
        </div>
        <div className="w-full px-1">
          <Link
            to="/login"
            className=" flex w-full items-center justify-center bg-black text-white px-4 py-2 rounded text-lg font-medium mb-4"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
