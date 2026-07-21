import React, { useState,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {UserDataContext} from '../context/UserContext';
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData] = useState({});

  const {userData,setUserData}=useContext(UserDataContext);
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // setUserData({ email, password });
    const user={
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);

      if (response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        navigate('/home');
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {
        // Server responded with an error status (wrong credentials, validation, etc.)
        setError(err.response.data?.message || "Invalid email or password.");
      } else if (err.request) {
        // Request was made but no response came back (backend unreachable, CORS, wrong URL, etc.)
        setError("Could not reach the server. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
          {error && (
            <p className="text-red-600 text-sm mb-3">{error}</p>
          )}
          <button
            className="flex w-full items-center justify-center bg-black text-white px-4 py-2 rounded text-lg font-medium mb-3 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center">New User? <Link to="/register" className="text-[#2f73f2]">Create an account</Link> </p>
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
