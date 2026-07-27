import React, { useState,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {CaptainDataContext} from '../context/CaptainContext';
import axios from "axios";
import {ArrowRight} from 'lucide-react';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {captainData, setCaptainData} = useContext(CaptainDataContext);
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if(response.status === 200) {
      const data = response.data;
      setCaptainData(data);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-5 sm:p-8 md:p-10">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <img
            className="h-8 sm:h-10 md:h-12"
            src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
            alt="logo"
          />
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.7} />
        </div>
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base sm:text-lg mb-2">What's our captain's email?</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-3 px-3 text-base bg-[#f3f3f6] mb-4 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            Login
          </button>
        </form>
        <p className="text-center text-sm sm:text-base">
          New join as Captain?{" "}
          <Link to="/captain-register" className="text-[#2f73f2]">
            Register
          </Link>{" "}
        </p>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <Link
          to="/login"
          className="flex w-full items-center justify-center bg-black text-white px-4 py-3 rounded-lg text-base sm:text-lg font-medium mb-2 sm:mb-4 active:scale-95 transition-transform"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;