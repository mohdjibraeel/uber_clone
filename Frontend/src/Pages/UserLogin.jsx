import React, { useState,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {UserDataContext} from '../context/UserContext';
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});

  const {userData,setUserData}=useContext(UserDataContext);
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // setUserData({ email, password });
    const user={
      email: email,
      password: password
    }
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,user);

    if(response.status===200){
      const data=response.data;
      setUserData(data.user);
      localStorage.setItem("token",data.token);
      navigate('/home');

    }

    setEmail("");
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
        <form action="" onSubmit={(e) => {submitHandler(e)}}>
          <h3 className="text-base sm:text-lg mb-2">What's your email?</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-3 px-3 text-base bg-[#f3f3f6] mb-4 focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            value={email}
            onChange={(e) =>{
              setEmail(e.target.value)
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
        <p className="text-center text-sm sm:text-base">New User? <Link to="/register" className="text-[#2f73f2]">Create an account</Link> </p>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <Link to="/captain-login"
          className="flex w-full items-center justify-center bg-black text-white px-4 py-3 rounded-lg text-base sm:text-lg font-medium mb-2 sm:mb-4 active:scale-95 transition-transform"
        >
          Sign in as Captain
        </Link> 
      </div>
    </div>
  );
};

export default UserLogin;