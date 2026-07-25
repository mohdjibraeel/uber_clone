import axios from "axios";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRide = (props) => {
  const [otp, setOtp] = useState("");
  const navigate=useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if(response.status===200){
      props.setConfirmRidePanel(false);
      navigate('/captain-riding',{state:{ride:props.ride}});
    }
  };
  const nameSetter = (str) => {
    const index = str?.indexOf(",");
    const firstWord = str?.slice(0, index);
    const remaining = str?.slice(index + 1).trim();
    return [firstWord, remaining];
  };
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2
            onClick={() => {
              props.setConfirmRidePanel(false);
            }}
            className="absolute right-5 sm:right-5.5 top-3"
          >
            <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
          </h2>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Confirm this Ride to Start
          </h2>

          <div className="flex items-center justify-between gap-2 p-2 my-2 rounded-lg bg-[#eee]">
            <div className="flex items-center gap-2 min-w-0">
              <img
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0"
                src="https://images.unsplash.com/photo-1769643501027-b454e657395b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h1 className="text-base sm:text-lg font-medium truncate">
                {props.ride?.user.fullname.firstname}{" "}
                {props.ride?.user.fullname.lastname}
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <h4 className="text-base sm:text-lg font-bold">₹{props.ride?.fare}</h4>
              <p className="text-center text-xs sm:text-sm -mt-1">
                {props.ride?.distance} KM
              </p>
            </div>
          </div>

          <div className="w-full border-b flex gap-3 items-center py-3 px-2">
            <div className="shrink-0">
              <i className="text-xl sm:text-2xl ri-map-pin-user-line"></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-base sm:text-lg truncate">
                {nameSetter(props.ride?.pickup)[0]}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 break-words">
                {nameSetter(props.ride?.pickup)[1]}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
            <div className="shrink-0">
              <i className="text-xl sm:text-2xl ri-map-pin-fill"></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-base sm:text-lg truncate">
                {nameSetter(props.ride?.destination)[0]}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 break-words">
                {nameSetter(props.ride?.destination)[1]}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
            <div className="shrink-0">
              <i className="text-xl sm:text-2xl ri-pin-distance-line"></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-base sm:text-lg">{props.ride?.distance} KM</h3>
              <p className="text-xs sm:text-sm text-gray-700">Ride Total Distance</p>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center py-3 px-2">
            <div className="shrink-0">
              <i className="text-xl sm:text-2xl ri-cash-line"></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-base sm:text-lg">₹{props.ride?.fare}</h3>
              <p className="text-xs sm:text-sm text-gray-700">Payment Cash</p>
            </div>
          </div>
        </div>
        <div className="p-1">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="Number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              className="rounded border font-mono border-gray-300 w-full p-3 px-3 text-base bg-[#f3f3f6] focus:outline-none focus:ring-2 focus:ring-[#2f73f2]"
            />
            <button className="bg-green-600 w-full block text-center text-white p-3 text-base sm:text-xl font-medium mt-3 rounded-lg active:scale-95 transition-transform">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePanel(false);
                props.confirmRide();
              }}
              className="bg-red-600 w-full text-white p-3 text-base sm:text-xl font-medium mt-3 rounded-lg active:scale-95 transition-transform"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmRide;