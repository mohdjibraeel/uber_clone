import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocketContext from "../context/SocketContext";

const UserRiding = () => {
  const nameSetter = (str) => {
    const index = str?.indexOf(",");
    const firstWord = str?.slice(0, index);
    const remaining = str?.slice(index + 1).trim();
    return [firstWord, remaining];
  };
  const location = useLocation();
  const ride = location.state?.ride;

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="min-h-screen relative">
      <Link to="/home">
        <img
          className="w-16 sm:w-20 md:w-24 absolute top-2 left-2 sm:top-4 sm:left-4 z-10"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt=""
        />
      </Link>
      <Link
        to="/home"
        className="fixed z-10 bg-white rounded-full h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center right-2 top-2 sm:right-4 sm:top-4 shadow-md"
      >
        <i className="text-xl font-medium ri-home-6-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="p-4 sm:p-6 w-full max-w-md md:max-w-lg mx-auto">
        <div className="flex items-center text-center justify-between gap-2 w-full p-3 rounded-xl">
          <img
            className="h-14 sm:h-16 md:h-20 object-contain shrink-0"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt=""
          />
          <div className="text-right min-w-0">
            <h2 className="font-medium truncate">
              {ride?.captain.fullname.firstname}{" "}
              {ride?.captain.fullname.lastname}
            </h2>
            <h3 className="font-bold truncate">{ride?.captain.vehicle.plate}</h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {ride?.captain.vehicle.color} {ride?.captain.vehicle.vehicleType}
            </p>
          </div>
        </div>
        <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
          <div className="shrink-0">
            <i className="text-xl sm:text-2xl ri-map-pin-fill"></i>
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-base sm:text-lg truncate">
              {nameSetter(ride?.destination)[0]}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 break-words">
              {nameSetter(ride?.destination)[1]}
            </p>
          </div>
        </div>
        <div className="w-full flex gap-3 items-center py-3 px-2">
          <div className="shrink-0">
            <i className="text-xl sm:text-2xl ri-cash-line"></i>
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-base sm:text-lg">₹ {ride?.fare}</h3>
            <p className="text-xs sm:text-sm text-gray-700">Payment Cash</p>
          </div>
        </div>
        <div>
          <button className="w-full bg-green-600 text-white p-3 text-base sm:text-xl font-medium mt-3 rounded-lg active:scale-95 transition-transform">
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRiding;