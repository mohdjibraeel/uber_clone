import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainRegister = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [captainData, setCaptainData] = useState({});
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        fullname:{
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password
      })
      console.log("User Data:", userData);
      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword(""); 
    };
  return (
    <div>
      <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="h-15 translate-x-[-10%] mb-7"
            src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
            alt="logo"
          />
          <form action="" onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className="text-lg mb-2">Enter your Name</h3>
            <div className="flex gap-2">
              <input
              required
              className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="First Name"
            /><input
              required
              className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Last Name"
            />

            </div>
            <h3 className="text-lg mb-2">Enter email</h3>
            <input
              required
              className="rounded border border-gray-300 w-full p-2 px-3 bg-[#f3f3f6] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Create Account
            </button>
          </form>
          <p className="text-center">
            Already Have Account?{" "}
            <Link to="/captain-login" className="text-[#2f73f2]">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p className=" text-xs text-[#5e5e5e] mb-1">
            By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CaptainRegister