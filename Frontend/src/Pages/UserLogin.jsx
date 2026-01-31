import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    console.log("User Data:", userData);
    setEmail("");
    setPassword(""); 
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div > 
        <img
          className="h-15 translate-x-[-10%] mb-7"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="logo"
        />
        <form  action="" onSubmit={(e) => {submitHandler(e)}}>
          <h3 className="text-lg mb-2">What's your email?</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-2 px-3 bg-[#f3f3f6] mb-4"
            value={email}
            onChange={(e) =>{
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="Example@email.com"
          />
          <h3 className="text-lg mb-2">Enter password</h3>
          <input
            required
            className="rounded border border-gray-300 w-full p-2 px-3 bg-[#f3f3f6] mb-7"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            className="flex w-full items-center justify-center bg-black text-white px-4 py-2 rounded text-lg font-medium mb-3"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center">New Here? <Link to="/register" className="text-[#2f73f2]">Create an account</Link> </p>
      </div>
      <div>
        <Link to="/captain-login"
          className="flex w-full items-center justify-center bg-black text-white px-4 py-2 rounded text-lg font-medium mb-4"
        >
          Sign in as Captain
        </Link> 
      </div>
    </div>
  );
};

export default UserLogin;
