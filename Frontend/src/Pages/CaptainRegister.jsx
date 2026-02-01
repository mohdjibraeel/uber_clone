import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import {ArrowRight} from 'lucide-react'

const CaptainRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { CaptainData, setCaptainData } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        vehicleType: vehicleType,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captain,
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptainData(data);
      navigate("/captain-home");
    }
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };
  return (
    <div>
      <div>
        <div className="p-7 h-screen flex flex-col justify-between">
          <div>
            <div className="flex">
              <img
                className="h-15 translate-x-[-10%] mb-7"
                src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
                alt="logo"
              />
              <div className="translate-x-[-60%] translate-y-[20%]">
                <ArrowRight size={28} strokeWidth={2.7} />
              </div>
            </div>
            <form
              action=""
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <h3 className="text-lg mb-2">Enter your Name</h3>
              <div className="flex gap-2">
                <input
                  required
                  className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  placeholder="First Name"
                />
                <input
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
                className="rounded border border-gray-300 w-full p-2 px-3 bg-[#f3f3f6] mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <h3 className="text-lg mb-2 text-center font-bold">
                Vehicle Information
              </h3>
              <div className="flex gap-2">
                <input
                  required
                  className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  type="number"
                  placeholder="Capacity"
                />
                <input
                  required
                  className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  type="text"
                  placeholder="Color"
                />
              </div>
              <div className="flex gap-2">
                <input
                  required
                  className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  type="text"
                  placeholder="Vehicle Plate"
                />
                <select
                  required
                  className="rounded border border-gray-300 w-1/2 p-2 px-3 bg-[#f3f3f6] mb-4"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="auto">Auto</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
              <button
                className="flex w-full items-center justify-center bg-black text-white px-4 py-2 rounded text-lg font-medium mb-3"
                type="submit"
              >
                Register Captain
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
              By continuing, you agree to calls, including by autodialer,
              WhatsApp, or texts from Uber and its affiliates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainRegister;
