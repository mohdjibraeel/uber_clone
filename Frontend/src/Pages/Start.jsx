import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen w-full bg-[#2f73f2] flex flex-col items-center justify-between py-6 px-5 sm:py-10 sm:px-8 md:py-14">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md text-center flex flex-col items-center mt-6 sm:mt-10 md:mt-14">
        <img
          className="h-12 sm:h-16 md:h-20"
          src="https://media.ffycdn.net/us/postmates/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC8xN1wvNTUxMFwvMmM3MTkyZDM1NGQ0YjA2YWFhZTgzZDc5Yzc2MzYwNWMtMTYyMDM3Nzc0OC5haSJ9:postmates:cvkkT2vHrzRiGiujqpqbVFn9z8dn773yTgVOCePXowk?width=2400"
          alt="logo"
        />
        <img
          className="h-28 w-auto sm:h-36 md:h-44 mt-4 sm:mt-6"
          src="https://images.icon-icons.com/2556/PNG/512/security_guard_shield_icon_153085.png"
          alt="Safety"
        />
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mt-3 sm:mt-4">
          Welcome to Uber
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl font-normal mt-1">
          Move with Safety
        </p>
      </div>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md px-1">
        <Link
          to="/login"
          className="flex w-full items-center justify-center bg-black text-white px-4 py-3 rounded-lg text-base sm:text-lg font-medium mb-2 sm:mb-4 active:scale-95 transition-transform"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Start;