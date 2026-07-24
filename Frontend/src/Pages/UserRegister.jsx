import React, { useState, useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";


const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const {userData,setUserData}=useContext(UserDataContext);
  const navigate=useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser={
      fullname:{
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    };
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status==201){
      const data=response.data;
      setUserData(data);
      navigate("/home");
    }
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword(""); 
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-5 sm:p-8 md:p-10">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <img
          className="h-8 sm:h-10 md:h-12 mb-6 sm:mb-8"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="logo"
        />
        <form action="" onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className="text-base sm:text-lg mb-2">Enter your Name</h3>
          <div className="flex gap-2 sm:gap-3">
            <input
            required
            className="rounded border border-gray-300 w-1/2 p-3 px-3 text-base bg-[#f3f3f6] mb-4 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="First Name"
          /><input
            required
            className="rounded border border-gray-300 w-1/2 p-3 px-3 text-base bg-[#f3f3f6] mb-4 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last Name"
          />

          </div>
          <h3 className="text-base sm:text-lg mb-2">Enter email</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-3 px-3 text-base bg-[#f3f3f6] mb-4 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Example@email.com"
          />
          <h3 className="text-base sm:text-lg mb-2">Enter password</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-3 px-3 text-base bg-[#f3f3f6] mb-6 sm:mb-7 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            className="flex w-full items-center justify-center bg-black text-white px-4 py-3 rounded-lg text-base sm:text-lg font-medium mb-3 active:scale-95 transition-transform"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm sm:text-base">
          Already Have Account?{" "}
          <Link to="/login" className="text-[#2f73f2]">
            Login
          </Link>
        </p>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <p className="text-xs sm:text-sm text-[#5e5e5e] mb-1">
          By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
};

export default UserRegister;